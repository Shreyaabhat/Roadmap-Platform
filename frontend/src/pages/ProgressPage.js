import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { progressAPI } from '../api/api';
import { ProgressBar, StatCard, PageHeader, Spinner } from '../components/common/UIComponents';

const ProgressPage = () => {
  const { user } = useAuth();
  const [progressList, setProgressList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await progressAPI.getUserProgress(user._id);
        setProgressList(data.progress || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user._id]);

  const totalCompleted = progressList.reduce((s, p) => s + (p.completedLessons?.length || 0), 0);
  const completed100 = progressList.filter((p) => p.percentage === 100).length;
  const inProgress = progressList.filter((p) => p.percentage > 0 && p.percentage < 100).length;
  const avgProgress = progressList.length
    ? Math.round(progressList.reduce((s, p) => s + p.percentage, 0) / progressList.length)
    : 0;

  if (loading) return (
    <div className="flex items-center justify-center h-64"><Spinner size="lg" /></div>
  );

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="My Progress"
        subtitle="Track your learning journey across all roadmaps"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="✅" label="Lessons Completed" value={totalCompleted} color="green" />
        <StatCard icon="🏆" label="Completed Roadmaps" value={completed100} color="amber" />
        <StatCard icon="📈" label="In Progress" value={inProgress} color="blue" />
        <StatCard icon="⚡" label="Avg. Progress" value={`${avgProgress}%`} color="purple" />
      </div>

      {progressList.length === 0 ? (
        <div className="card text-center py-16">
          <div className="text-5xl mb-4">🗺️</div>
          <h3 className="text-white font-semibold text-lg mb-2">No progress yet</h3>
          <p className="text-gray-400 text-sm mb-6">Start a roadmap and complete lessons to see your progress here.</p>
          <Link to="/roadmaps" className="btn-primary">Browse Roadmaps</Link>
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-white">Roadmap Progress</h2>
          {progressList.map((prog) => {
            const rm = prog.roadmapId;
            if (!rm || typeof rm !== 'object') return null;

            return (
              <div key={prog._id} className="card">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: (rm.color || '#6366f1') + '20' }}
                  >
                    {rm.icon || '📚'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-white font-semibold">{rm.title}</h3>
                        <p className="text-gray-400 text-sm capitalize">{rm.type} path</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">{prog.percentage}%</p>
                        <p className="text-gray-500 text-xs">{prog.completedLessons?.length}/{rm.totalLessons} lessons</p>
                      </div>
                    </div>
                  </div>
                </div>

                <ProgressBar
                  percentage={prog.percentage}
                  showLabel={false}
                  size="lg"
                  color={prog.percentage === 100 ? 'green' : 'indigo'}
                />

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>Started: {new Date(prog.startedAt).toLocaleDateString()}</span>
                    <span>Updated: {new Date(prog.lastAccessedAt).toLocaleDateString()}</span>
                  </div>
                  {prog.percentage === 100 ? (
                    <span className="text-emerald-400 text-sm font-medium">🏆 Completed!</span>
                  ) : (
                    <Link
                      to={`/roadmaps/${rm._id}`}
                      className="btn-secondary text-sm py-1.5 px-4"
                    >
                      Continue →
                    </Link>
                  )}
                </div>

                {/* Completed lessons list */}
                {prog.completedLessons?.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <p className="text-xs text-gray-500 mb-3 font-medium">Recent completions</p>
                    <div className="flex flex-wrap gap-2">
                      {prog.completedLessons.slice(-8).map((cl, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1"
                        >
                          <span className="text-emerald-400 text-xs">✓</span>
                          <span className="text-xs text-emerald-300">
                            {new Date(cl.completedAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Achievements */}
      <div className="mt-8 card">
        <h2 className="text-lg font-semibold text-white mb-4">Achievements</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: '🌱', name: 'First Step', desc: 'Complete your first lesson', unlocked: totalCompleted >= 1 },
            { icon: '🔥', name: 'On Fire', desc: 'Complete 5 lessons', unlocked: totalCompleted >= 5 },
            { icon: '💪', name: 'Dedicated', desc: 'Complete 10 lessons', unlocked: totalCompleted >= 10 },
            { icon: '🏆', name: 'Champion', desc: 'Finish a full roadmap', unlocked: completed100 >= 1 },
          ].map(({ icon, name, desc, unlocked }) => (
            <div
              key={name}
              className={`flex flex-col items-center text-center p-4 rounded-xl border transition-all ${
                unlocked
                  ? 'bg-amber-500/10 border-amber-500/30'
                  : 'bg-gray-800/30 border-gray-800 opacity-50'
              }`}
            >
              <span className={`text-3xl mb-2 ${!unlocked && 'grayscale'}`}>{icon}</span>
              <p className={`text-sm font-medium ${unlocked ? 'text-amber-300' : 'text-gray-500'}`}>{name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;