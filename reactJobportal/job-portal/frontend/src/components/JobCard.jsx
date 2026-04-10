import { motion } from 'framer-motion';
import { MapPin, Building2, DollarSign, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { applyForJob } from '../utils/localStorage';
import toast from 'react-hot-toast';

export default function JobCard({ job, index = 0, onApplied }) {
  const { currentUser } = useAuth();
  const hasApplied = currentUser?.appliedJobs?.includes(job.id);

  const handleApply = (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error('Please login to apply!');
      return;
    }
    const success = applyForJob(job.id, currentUser.id);
    if (success) {
      toast.success(`Applied to ${job.title} at ${job.company}!`);
      if (onApplied) onApplied();
    } else {
      toast('You have already applied for this job!', { icon: '⚠️' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group relative bg-white dark:bg-gray-800/60 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-md hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
    >
      {/* Gradient Accent */}
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-blue-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-900/40 dark:to-violet-900/40 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400 text-lg flex-shrink-0">
            {job.company?.[0]?.toUpperCase()}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">{job.title}</h3>
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm mt-0.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>{job.company}</span>
            </div>
          </div>
        </div>
        {hasApplied && (
          <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-semibold bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Applied
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 px-3 py-1.5 rounded-lg">
          <MapPin className="w-3.5 h-3.5 text-blue-500" />
          {job.location}
        </span>
        {job.salary && (
          <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 px-3 py-1.5 rounded-lg">
            <DollarSign className="w-3.5 h-3.5 text-green-500" />
            {job.salary}
          </span>
        )}
      </div>

      {/* Description Preview */}
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-5">
        {job.description}
      </p>

      {/* Actions */}
      {currentUser?.role === 'seeker' && (
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleApply}
            disabled={hasApplied}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              hasApplied
                ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:shadow-lg hover:shadow-blue-500/25 active:scale-95'
            }`}
          >
            {hasApplied ? '✓ Applied' : 'Apply Now'}
          </motion.button>
          <Link to={`/jobs/${job.id}`} className="flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200">
            Learn More <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </motion.div>
  );
}
