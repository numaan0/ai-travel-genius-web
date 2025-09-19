// src/app/page.tsx
'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Plane, Sparkles, Zap, Users, Clock, DollarSign } from 'lucide-react'
import PersonalityQuiz from '@/components/features/trip-planner/PersonalityQuiz'
import TripPlannerForm from '@/components/features/trip-planner/TripPlannerForm'

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false)
  const [showPlanner, setShowPlanner] = useState(false)
  const [userPersonality, setUserPersonality] = useState<string>('')

  const handleQuizComplete = (personality: string) => {
    setUserPersonality(personality)
    setShowQuiz(false)
    setShowPlanner(true)
  }

  if (showPlanner) {
    return <TripPlannerForm personality={userPersonality} />
  }

  if (showQuiz) {
    return <PersonalityQuiz onComplete={handleQuizComplete} />
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-20 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full opacity-15 blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          {/* Logo/Brand */}
          <div className="flex justify-center items-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-16 w-16 text-yellow-400 mr-4" />
            </motion.div>
            <h1 className="text-7xl font-bold text-white">
              AI Travel <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Genius</span>
            </h1>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="h-16 w-16 text-yellow-400 ml-4" />
            </motion.div>
          </div>

          {/* Main Headline */}
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            What if trip planning was as{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
              addictive as Instagram
            </span>
            {' '}and as{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              smart as ChatGPT?
            </span>
          </motion.h2>

          {/* Subheading */}
          <motion.p 
            className="text-2xl text-blue-100 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Discover your perfect trip with AI-powered personalization, real-time adaptation, 
            and <span className="text-yellow-400 font-bold">one-click booking through EaseMyTrip!</span>
          </motion.p>

          {/* Stats Row */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="text-4xl font-bold text-yellow-400 mb-2">10x</div>
              <div className="text-blue-100">Faster Planning</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="text-4xl font-bold text-yellow-400 mb-2">40%</div>
              <div className="text-blue-100">Cost Savings</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="text-4xl font-bold text-yellow-400 mb-2">1-Click</div>
              <div className="text-blue-100">Complete Booking</div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {/* Primary CTA */}
          <motion.button
            onClick={() => setShowQuiz(true)}
            className="group relative px-12 py-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-xl rounded-2xl shadow-2xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="relative z-10 flex items-center">
              ✨ Discover My Travel Personality ✨
            </span>
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-20"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            onClick={() => setShowPlanner(true)}
            className="px-12 py-6 border-2 border-white/30 text-white font-bold text-xl rounded-2xl backdrop-blur-lg hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.6)' }}
            whileTap={{ scale: 0.98 }}
          >
            Skip to Trip Planner →
          </motion.button>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="text-center bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
            <Users className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">AI Personality Match</h3>
            <p className="text-blue-100">Discover if you're an Adventure Seeker, Luxury Lover, Culture Explorer, or Party Animal!</p>
          </div>
          <div className="text-center bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
            <Clock className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Real-Time Magic</h3>
            <p className="text-blue-100">Weather changes? Flight delays? Our AI adapts your entire itinerary instantly!</p>
          </div>
          <div className="text-center bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
            <DollarSign className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">One-Click Booking</h3>
            <p className="text-blue-100">Complete trip booking through EaseMyTrip - flights, hotels, activities - all in one click!</p>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <p className="text-blue-200 mb-4">Powered by the latest AI technology:</p>
          <div className="flex justify-center items-center space-x-8 flex-wrap">
            <div className="text-white font-semibold bg-white/10 px-4 py-2 rounded-lg">Google Gemini AI</div>
            <div className="text-white font-semibold bg-white/10 px-4 py-2 rounded-lg">EaseMyTrip API</div>
            <div className="text-white font-semibold bg-white/10 px-4 py-2 rounded-lg">Real-time Data</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
