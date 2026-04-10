import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Building2, DollarSign, CheckCircle2, Briefcase, Users } from 'lucide-react';
import { getJobs, applyForJob, getCurrentUser } from '../utils/localStorage';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const jobs = getJobs();
    const found = jobs.find(j => j.id === id);
    setJob(found || null);
    const freshUser = getCurrentUser();
    setApplied(freshUser?.appliedJobs?.includes(id) || false);
  }, [id]);

  const handleApply = async () => {
    if (!currentUser) { toast.error('Please login to apply!'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const success = applyForJob(id, currentUser.id);
    if (success) {
      toast.success(`Successfully applied to ${job.title}!`);
      setApplied(true);
    } else {
      toast(`You've already applied for this job!`, { icon: '⚠️' });
    }
    setLoading(false);
  };

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-gray-950">
        <Briefcase className="w-16 h-16 text-gray-300 dark:text-gray-600" />
        <p className="text-xl font-semibold text-gray-500 dark:text-gray-400">Job not found</p>
        <Link to="/seeker" className="text-blue-600 dark:text-blue-400 hover:underline">← Back to Jobs</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </motion.button>

        {/* Job Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          {/* Header Banner */}
          <div className="h-2 bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500" />

          <div className="p-8">
            {/* Top Info */}
            <div className="flex items-start gap-5 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-900/40 dark:to-violet-900/40 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400 text-2xl flex-shrink-0">
                {job.company?.[0]?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{job.title}</h1>
                <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 mt-1">
                  <Building2 className="w-4 h-4" />
                  <span className="font-medium">{job.company}</span>
                </div>
              </div>
            </div>

            {/* Meta Chips */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-lg">
                <MapPin className="w-4 h-4 text-blue-500" />{job.location}
              </span>
              {job.salary && (
                <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-lg">
                  <DollarSign className="w-4 h-4 text-green-500" />{job.salary}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-lg">
                <Users className="w-4 h-4 text-violet-500" />{job.applicants?.length || 0} Applicants
              </span>
            </div>

            {/* Description */}
            <section className="mb-6">
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <span className="w-1 h-5 bg-gradient-to-b from-blue-500 to-violet-500 rounded-full inline-block" />
                About the Role
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm whitespace-pre-line">
                {job.description}
              </p>
            </section>

            {/* Requirements */}
            <section className="mb-8">
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <span className="w-1 h-5 bg-gradient-to-b from-violet-500 to-pink-500 rounded-full inline-block" />
                Requirements
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm whitespace-pre-line">
                {job.requirements}
              </p>
            </section>

            {/* Apply */}
            {currentUser?.role === 'seeker' && (
              <motion.button
                whileHover={{ scale: applied ? 1 : 1.02 }}
                whileTap={{ scale: applied ? 1 : 0.97 }}
                onClick={handleApply}
                disabled={applied || loading}
                className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all ${
                  applied
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40'
                }`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : applied ? (
                  <><CheckCircle2 className="w-5 h-5" /> Applied Successfully!</>
                ) : (
                  <><Briefcase className="w-5 h-5" /> Apply Now</>
                )}
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
