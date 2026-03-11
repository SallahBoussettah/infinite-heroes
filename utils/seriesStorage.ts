/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { Series, IssueMetadata, ComicFace } from '../types';

const SERIES_STORAGE_KEY = 'infinite-heroes-series';
const CURRENT_SERIES_KEY = 'infinite-heroes-current-series';

export const seriesStorage = {
  // Get all series
  getAllSeries(): Series[] {
    try {
      const data = localStorage.getItem(SERIES_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to load series:', e);
      return [];
    }
  },

  // Get a specific series by ID
  getSeries(seriesId: string): Series | null {
    const allSeries = this.getAllSeries();
    return allSeries.find(s => s.id === seriesId) || null;
  },

  // Save or update a series
  saveSeries(series: Series): void {
    try {
      const allSeries = this.getAllSeries();
      const existingIndex = allSeries.findIndex(s => s.id === series.id);

      series.lastModified = Date.now();

      if (existingIndex >= 0) {
        allSeries[existingIndex] = series;
      } else {
        allSeries.push(series);
      }

      localStorage.setItem(SERIES_STORAGE_KEY, JSON.stringify(allSeries));
    } catch (e) {
      console.error('Failed to save series:', e);
    }
  },

  // Delete a series
  deleteSeries(seriesId: string): void {
    try {
      const allSeries = this.getAllSeries();
      const filtered = allSeries.filter(s => s.id !== seriesId);
      localStorage.setItem(SERIES_STORAGE_KEY, JSON.stringify(filtered));

      // Clear current series if it was deleted
      const currentId = this.getCurrentSeriesId();
      if (currentId === seriesId) {
        this.setCurrentSeriesId(null);
      }
    } catch (e) {
      console.error('Failed to delete series:', e);
    }
  },

  // Get current active series ID
  getCurrentSeriesId(): string | null {
    return localStorage.getItem(CURRENT_SERIES_KEY);
  },

  // Set current active series ID
  setCurrentSeriesId(seriesId: string | null): void {
    if (seriesId) {
      localStorage.setItem(CURRENT_SERIES_KEY, seriesId);
    } else {
      localStorage.removeItem(CURRENT_SERIES_KEY);
    }
  },

  // Get current active series
  getCurrentSeries(): Series | null {
    const seriesId = this.getCurrentSeriesId();
    return seriesId ? this.getSeries(seriesId) : null;
  },

  // Add a completed issue to a series
  addIssueToSeries(seriesId: string, issueMetadata: IssueMetadata): void {
    const series = this.getSeries(seriesId);
    if (series) {
      series.issues.push(issueMetadata);
      series.currentIssueNumber = issueMetadata.issueNumber + 1;
      this.saveSeries(series);
    }
  },

  // Generate series overview from issues
  generateSeriesOverview(series: Series): string {
    if (series.issues.length === 0) {
      return `Beginning of a ${series.genre} story set in ${series.setting} during ${series.timePeriod}. Theme: ${series.theme}.`;
    }

    const overview = series.issues.map(issue => {
      const events = issue.keyEvents.join(', ');
      return `Issue #${issue.issueNumber}: ${events}`;
    }).join(' ');

    return overview;
  },

  // Extract issue metadata from comic faces
  extractIssueMetadata(
    seriesId: string,
    issueNumber: number,
    comicFaces: ComicFace[],
    createdAt: number
  ): IssueMetadata {
    const storyPages = comicFaces.filter(f => f.type === 'story' && f.narrative);

    // Extract key events from narratives
    const keyEvents = storyPages
      .filter(p => p.narrative?.caption || p.narrative?.dialogue)
      .slice(0, 3) // Take first 3 significant moments
      .map(p => {
        const caption = p.narrative?.caption || '';
        const dialogue = p.narrative?.dialogue || '';
        return caption || dialogue;
      })
      .filter(e => e.length > 0);

    // Get last story page for character states
    const lastPage = storyPages[storyPages.length - 1];
    const heroState = lastPage?.narrative?.focus_char === 'hero'
      ? (lastPage.narrative.caption || lastPage.narrative.dialogue || 'Active')
      : 'Active';

    const friendState = lastPage?.narrative?.focus_char === 'friend'
      ? (lastPage.narrative.caption || lastPage.narrative.dialogue || 'Active')
      : undefined;

    // Extract unresolved questions (decision pages without resolutions)
    const unsolvedMysteries = storyPages
      .filter(p => p.isDecisionPage && p.resolvedChoice)
      .map(p => `Choice made: ${p.resolvedChoice}`)
      .slice(-2); // Last 2 choices as mysteries

    const lastChoice = storyPages
      .filter(p => p.isDecisionPage && p.resolvedChoice)
      .slice(-1)[0]?.resolvedChoice;

    return {
      issueNumber,
      seriesId,
      createdAt,
      completedAt: Date.now(),
      totalPages: comicFaces.length,
      keyEvents,
      characterStates: {
        heroState,
        friendState,
        relationships: friendState ? 'Partnership continues' : 'Solo adventure'
      },
      unsolvedMysteries,
      lastChoice
    };
  },

  // Create a new series
  createSeries(
    name: string,
    hero: any,
    friend: any,
    genre: string,
    setting: string,
    theme: string,
    timePeriod: string,
    artStyle: string,
    language: string,
    richMode: boolean,
    totalIssuesPlanned: number,
    customPremise?: string
  ): Series {
    const id = `series-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    return {
      id,
      name,
      hero,
      friend,
      genre,
      setting,
      theme,
      timePeriod,
      artStyle,
      language,
      richMode,
      customPremise,
      totalIssuesPlanned,
      issues: [],
      currentIssueNumber: 1,
      createdAt: Date.now(),
      lastModified: Date.now()
    };
  }
};
