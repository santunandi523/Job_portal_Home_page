import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Briefcase, CheckCircle, X } from 'lucide-react';
import JobCard from '../components/JobCard';
import { getJobs, getCurrentUser } from '../utils/localStorage';
import { useAuth } from '../context/AuthContext';

const locations = ['All Locations', 'Remote', 'New York, NY', 'San Francisco, CA', 'Austin, TX'];

export default function SeekerDashboard() {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [tab, setTab] = useState('all'); // 'all' | 'applied'
  const [refreshKey, setRefreshKey] = useState(0);

  const loadJobs = useCallback(() => {
    setJobs(getJobs());
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs, refreshKey]);

  const handleApplied = () => setRefreshKey(k => k + 1);

  // Get fresh currentUser appliedJobs from localStorage on every render
  const freshUser = getCurrentUser();
  const appliedJobIds = freshUser?.appliedJobs || [];

  const filteredJobs = jobs.filter(job => {
    const matchesQuery =
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      job.location.toLowerCase().includes(query.toLowerCase());
    const matchesLocation = locationFilter === 'All Locations' || job.location === locationFilter;
    const matchesTab = tab === 'all' || (tab === 'applied' && appliedJobIds.includes(job.id));
    return matchesQuery && matchesLocation && matchesTab;
  });

  const appliedCount = appliedJobIds.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Good morning, <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">{currentUser?.name?.split(' ')[0]}!</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Find your perfect role — {jobs.length} jobs available</p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-xl px-4 py-3 shadow-sm border border-gray-100 dark:border-gray-700">
            <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{jobs.length} Jobs Available</span>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-xl px-4 py-3 shadow-sm border border-gray-100 dark:border-gray-700">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{appliedCount} Applied</span>
          </div>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs by title, company, or location..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all shadow-sm"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Location Filter */}
          <div className="relative">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
              className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all shadow-sm appearance-none cursor-pointer"
            >
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-1 mb-6 bg-gray-100 dark:bg-gray-800/50 rounded-xl p-1 w-fit"
        >
          {['all', 'applied'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                tab === t
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {t === 'all' ? 'All Jobs' : `Applied (${appliedCount})`}
            </button>
          ))}
        </motion.div>

        {/* Job Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredJobs.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} onApplied={handleApplied} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-gray-400 dark:text-gray-500"
          >
            <Briefcase className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-semibold">No jobs found</p>
            <p className="text-sm mt-1">Try adjusting your filters or search terms.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
