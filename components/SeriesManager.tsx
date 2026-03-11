/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { Series } from '../types';
import { seriesStorage } from '../utils/seriesStorage';

interface SeriesManagerProps {
    onContinueSeries: (series: Series) => void;
    onStartNew: () => void;
}

export const SeriesManager: React.FC<SeriesManagerProps> = ({ onContinueSeries, onStartNew }) => {
    const [allSeries, setAllSeries] = useState<Series[]>([]);
    const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);

    useEffect(() => {
        loadSeries();
    }, []);

    const loadSeries = () => {
        const series = seriesStorage.getAllSeries();
        setAllSeries(series.sort((a, b) => b.lastModified - a.lastModified));
    };

    const handleDelete = (seriesId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this series? This cannot be undone.')) {
            seriesStorage.deleteSeries(seriesId);
            loadSeries();
            if (selectedSeries?.id === seriesId) {
                setSelectedSeries(null);
            }
        }
    };

    const handleContinue = (series: Series) => {
        if (series.currentIssueNumber > series.totalIssuesPlanned) {
            alert(`This series is complete! All ${series.totalIssuesPlanned} issues have been created.`);
            return;
        }
        onContinueSeries(series);
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="fixed inset-0 z-[200] overflow-y-auto bg-black/90 backdrop-blur-sm">
            <div className="min-h-full flex items-center justify-center p-4 pb-32">
                <div className="max-w-[1000px] w-full bg-white p-6 rotate-[-0.5deg] border-[6px] border-black shadow-[16px_16px_0px_rgba(0,0,0,0.8)]">

                    <div className="text-center mb-6">
                        <h1 className="font-comic text-4xl text-red-600 inline-block mr-2" style={{textShadow: '2px 2px 0px black'}}>YOUR</h1>
                        <h1 className="font-comic text-4xl text-yellow-400 inline-block" style={{textShadow: '2px 2px 0px black'}}>SERIES</h1>
                    </div>

                    {allSeries.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 border-4 border-dashed border-gray-300 rounded">
                            <p className="font-comic text-2xl text-gray-600 mb-4">NO SERIES YET</p>
                            <p className="font-comic text-lg text-gray-500 mb-6">Start your first comic series!</p>
                            <button onClick={onStartNew} className="comic-btn bg-green-600 text-white text-2xl px-8 py-3 hover:bg-green-500 uppercase">
                                CREATE NEW SERIES
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4 mb-6">
                            {allSeries.map(series => {
                                const progress = Math.min((series.issues.length / series.totalIssuesPlanned) * 100, 100);
                                const isComplete = series.currentIssueNumber > series.totalIssuesPlanned;
                                const canContinue = !isComplete;

                                return (
                                    <div
                                        key={series.id}
                                        className={`p-4 border-4 border-black bg-gradient-to-r cursor-pointer transition-all hover:shadow-[6px_6px_0px_rgba(0,0,0,0.3)] ${
                                            isComplete ? 'from-green-50 to-blue-50' : 'from-yellow-50 to-orange-50'
                                        }`}
                                        onClick={() => setSelectedSeries(selectedSeries?.id === series.id ? null : series)}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-comic text-2xl font-bold text-black">{series.name}</h3>
                                                    {isComplete && (
                                                        <span className="comic-btn bg-green-600 text-white text-sm px-3 py-1 pointer-events-none">
                                                            COMPLETE
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3 text-sm">
                                                    <div>
                                                        <span className="font-comic font-bold text-gray-700">Genre:</span>
                                                        <span className="font-comic text-gray-600 ml-1">{series.genre}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-comic font-bold text-gray-700">Setting:</span>
                                                        <span className="font-comic text-gray-600 ml-1">{series.setting}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-comic font-bold text-gray-700">Theme:</span>
                                                        <span className="font-comic text-gray-600 ml-1">{series.theme}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-comic font-bold text-gray-700">Style:</span>
                                                        <span className="font-comic text-gray-600 ml-1">{series.artStyle}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="font-comic text-sm font-bold text-gray-700">
                                                                Issue {series.issues.length} of {series.totalIssuesPlanned}
                                                            </span>
                                                            <span className="font-comic text-sm text-gray-600">
                                                                {Math.round(progress)}%
                                                            </span>
                                                        </div>
                                                        <div className="h-3 bg-gray-300 border-2 border-black overflow-hidden">
                                                            <div
                                                                className="h-full bg-gradient-to-r from-yellow-400 to-red-500 transition-all duration-300"
                                                                style={{ width: `${progress}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <span className="font-comic text-xs text-gray-500">
                                                        {formatDate(series.lastModified)}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2 ml-4">
                                                {canContinue && (
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleContinue(series); }}
                                                        className="comic-btn bg-blue-600 text-white text-base px-4 py-2 hover:bg-blue-500 uppercase whitespace-nowrap"
                                                    >
                                                        Continue
                                                    </button>
                                                )}
                                                <button
                                                    onClick={(e) => handleDelete(series.id, e)}
                                                    className="comic-btn bg-red-600 text-white text-base px-4 py-2 hover:bg-red-500 uppercase"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>

                                        {/* Expanded Details */}
                                        {selectedSeries?.id === series.id && (
                                            <div className="mt-4 pt-4 border-t-4 border-black/20">
                                                <h4 className="font-comic text-lg font-bold text-gray-800 mb-2">ISSUE HISTORY:</h4>
                                                {series.issues.length === 0 ? (
                                                    <p className="font-comic text-gray-600">No issues created yet.</p>
                                                ) : (
                                                    <div className="space-y-2">
                                                        {series.issues.map((issue, idx) => (
                                                            <div key={idx} className="bg-white/50 p-3 border-2 border-black/30">
                                                                <div className="flex items-center justify-between mb-1">
                                                                    <span className="font-comic font-bold text-gray-800">
                                                                        Issue #{issue.issueNumber}
                                                                    </span>
                                                                    <span className="font-comic text-sm text-gray-600">
                                                                        {formatDate(issue.completedAt || issue.createdAt)}
                                                                    </span>
                                                                </div>
                                                                {issue.keyEvents.length > 0 && (
                                                                    <div className="font-comic text-sm text-gray-700">
                                                                        <span className="font-bold">Key Events:</span> {issue.keyEvents.slice(0, 2).join('; ')}
                                                                    </div>
                                                                )}
                                                                {issue.lastChoice && (
                                                                    <div className="font-comic text-sm text-gray-700 mt-1">
                                                                        <span className="font-bold">Choice:</span> {issue.lastChoice}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {allSeries.length > 0 && (
                        <button onClick={onStartNew} className="comic-btn bg-green-600 text-white text-2xl px-8 py-3 w-full hover:bg-green-500 uppercase">
                            START NEW SERIES
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
