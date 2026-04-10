import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Briefcase, Users, Search, Sparkles, Building2, MapPin, DollarSign
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const features = [
  { icon: Search, title: 'Smart Job Search', desc: 'Filter by title, company, or location instantly.', color: 'from-blue-500 to-cyan-500' },
  { icon: Building2, title: 'Top Companies', desc: 'Connect with 500+ leading companies and startups.', color: 'from-violet-500 to-purple-500' },
  { icon: Users, title: 'Role-Based Access', desc: 'Separate portals for seekers and recruiters.', color: 'from-pink-500 to-rose-500' },
  { icon: Sparkles, title: 'Easy Apply', desc: 'One-click apply and track all your applications.', color: 'from-amber-500 to-orange-500' },
];

const stats = [
  { label: 'Jobs Posted', value: '2,400+' },
  { label: 'Companies', value: '500+' },
  { label: 'Students Placed', value: '12K+' },
  { label: 'Colleges', value: '80+' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (currentUser?.role === 'seeker') navigate('/seeker');
    else if (currentUser?.role === 'recruiter') navigate('/recruiter');
    else navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-28 px-4">
        {/* Background blobs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-violet-400/20 dark:bg-violet-600/10 rounded-full blur-3xl" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative max-w-4xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800 mb-6">
            <Sparkles className="w-4 h-4" />
            #1 College Job Portal
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            Launch Your{' '}
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
              Dream Career
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            CampusHire connects college students and recruiters from top companies. Find internships, full-time roles, and everything in between.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(99,102,241,0.3)' }}
              whileTap={{ scale: 0.97 }}
              onClick={handleGetStarted}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-base shadow-lg shadow-blue-500/25"
            >
              {currentUser ? 'Go to Dashboard' : 'Get Started Free'}
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            {!currentUser && (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-bold text-base hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                >
                  <Briefcase className="w-5 h-5" />
                  Sign In
                </motion.button>
              </Link>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="px-4 pb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-md border border-gray-100 dark:border-gray-700"
            >
              <p className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">{s.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-4 pb-28">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Succeed</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
              Built specifically for college students and campus recruiters.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      {!currentUser && (
        <section className="px-4 pb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 p-12 text-center text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to find your first job?</h2>
              <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of students who have already landed their dream roles through CampusHire.
              </p>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-10 py-4 rounded-2xl bg-white text-blue-600 font-bold text-base shadow-lg hover:shadow-xl transition-all"
                >
                  Create Free Account
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
}
