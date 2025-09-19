// src/components/features/trip-planner/ItineraryDisplay.tsx
'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  ArrowLeft, MapPin, Calendar, DollarSign, Users, Camera, 
  Clock, Plane, Hotel, Star, Download, Share2, CheckCircle,
  AlertCircle, Info, Sparkles, ExternalLink, X, MapIcon
} from 'lucide-react'
import { useSession, signIn } from "next-auth/react";

import toast from 'react-hot-toast'
import ChatbotPopover from './ChatbotPopover'
interface ItineraryDisplayProps {
  itinerary: any
  userInput: any
  onBack: () => void
}

export default function ItineraryDisplay({ itinerary, userInput, onBack }: ItineraryDisplayProps) {
  const { data: session, status } = useSession();
  const [selectedDay, setSelectedDay] = useState(1)
  const [showBooking, setShowBooking] = useState(false)
  const [showConfetti, setShowConfetti] = useState(true)
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [showActivityModal, setShowActivityModal] = useState(false)

  const handleBookTrip = () => {
    setShowBooking(true)
    toast.success('🎉 Redirecting to EaseMyTrip for instant booking!')
    setTimeout(() => {
      toast.success('✈️ Trip booking successful! Get ready for an amazing adventure!')
    }, 2000)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('📋 Itinerary link copied! Share with friends!')
  }

  const handleDownload = () => {
    toast.success('📄 PDF download started! Your itinerary is ready!')
  }

  const handleViewDetails = (activity: any) => {
    setSelectedActivity(activity)
    setShowActivityModal(true)
  }

  const handleMakeReservation = (activity: any) => {
    toast.success(`🎯 Reservation request sent for ${activity.title}!`)
  }

  // Get current day's data
  const currentDay = itinerary.dailyPlans?.find((plan: any) => plan.day === selectedDay)

   if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    );
  }
  if(!session){
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-screen text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="mb-6 text-lg text-gray-600">
          🚫 You must be signed in to view itineraries.
        </p>
        <button
          onClick={() => signIn()}
          className="px-6 py-2 bg-blue-600 text-white rounded-2xl shadow-md hover:bg-blue-700 transition duration-300"
        >
          Sign in
        </button>
      </motion.div>
    );
  }
  return (
    <div className="min-h-screen p-4 relative">
      {/* Celebration Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 3, duration: 2 }}
            onAnimationComplete={() => setShowConfetti(false)}
          >
            <div className="w-full h-full relative">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][i % 6],
                    left: `${Math.random() * 100}%`,
                  }}
                  initial={{ y: -50, opacity: 1, rotate: 0 }}
                  animate={{ 
                    y: window.innerHeight + 50,
                    opacity: 0,
                    rotate: 360
                  }}
                  transition={{ 
                    duration: Math.random() * 3 + 2,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Activity Details Modal */}
      {showActivityModal && selectedActivity && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-lg rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-white/20"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {selectedActivity.title}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-blue-300">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {selectedActivity.duration}
                  </span>
                  <span className="flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    {selectedActivity.rating}/5
                  </span>
                  <span className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    ₹{selectedActivity.cost.toLocaleString()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowActivityModal(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-white mb-3">📍 Activity Details</h4>
                <p className="text-blue-100 text-lg leading-relaxed">
                  {selectedActivity.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <h5 className="text-white font-semibold mb-2">⏰ Timing</h5>
                  <p className="text-blue-200">{selectedActivity.timing}</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <h5 className="text-white font-semibold mb-2">🎯 Activity Type</h5>
                  <p className="text-blue-200 capitalize">{selectedActivity.type}</p>
                </div>
              </div>

              {selectedActivity.type === 'instagram' && (
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl p-4 border border-pink-300/30">
                  <h5 className="text-white font-semibold mb-2 flex items-center">
                    <Camera className="h-5 w-5 mr-2 text-pink-400" />
                    📸 Instagram Tips
                  </h5>
                  <p className="text-pink-200">
                    Perfect for social media! This spot is known for stunning visuals and gets thousands of likes. 
                    Best lighting conditions during the scheduled time.
                  </p>
                </div>
              )}

              <div className="flex space-x-4">
                <motion.button
                  onClick={() => handleMakeReservation(selectedActivity)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {selectedActivity.type === 'food' ? '🍽️ Make Reservation' : '🎫 Book Activity'}
                </motion.button>
                <motion.button
                  onClick={() => setShowActivityModal(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button 
            onClick={onBack}
            className="flex items-center text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-6 w-6 mr-2" />
            Back to Planning
          </button>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleShare}
              className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </button>
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-12"
        >
          <Sparkles className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-white mb-4">
            🎉 Your Epic Itinerary is Ready!
          </h1>
          <p className="text-xl text-blue-200">
            Get ready for the <span className="text-yellow-400 font-bold">adventure of a lifetime</span>!
          </p>
        </motion.div>

        {/* Trip Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-white/20"
        >
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold text-white mb-2">
              {itinerary.tripTitle || `Amazing ${userInput.days}-Day ${userInput.destination} Adventure`}
            </h2>
            <div className="flex justify-center items-center space-x-6 text-blue-200">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                {userInput.destination}
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                {userInput.days} Days
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                {userInput.groupSize} Travelers
              </div>
            </div>
          </div>

          {/* Budget Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center bg-white/10 rounded-2xl p-4">
              <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                ₹{itinerary.totalEstimatedCost?.toLocaleString() || userInput.budget.toLocaleString()}
              </div>
              <div className="text-blue-300 text-sm">Total Budget</div>
            </div>
            <div className="text-center bg-white/10 rounded-2xl p-4">
              <Hotel className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                ₹{Math.floor((itinerary.totalEstimatedCost || userInput.budget) * 0.4).toLocaleString()}
              </div>
              <div className="text-blue-300 text-sm">Accommodation</div>
            </div>
            <div className="text-center bg-white/10 rounded-2xl p-4">
              <Plane className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                ₹{Math.floor((itinerary.totalEstimatedCost || userInput.budget) * 0.3).toLocaleString()}
              </div>
              <div className="text-blue-300 text-sm">Activities</div>
            </div>
            <div className="text-center bg-white/10 rounded-2xl p-4">
              <Camera className="h-8 w-8 text-pink-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {itinerary.instagramSpots?.length || 5}
              </div>
              <div className="text-blue-300 text-sm">Instagram Spots</div>
            </div>
          </div>
        </motion.div>

        {/* Day-by-Day Itinerary */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Day Selector */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Days</h3>
            <div className="space-y-2">
              {itinerary.dailyPlans?.map((dayPlan: any) => (
                <button
                  key={dayPlan.day}
                  onClick={() => setSelectedDay(dayPlan.day)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    selectedDay === dayPlan.day
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span>Day {dayPlan.day}</span>
                      <div className="text-xs opacity-70 mt-1">
                        {dayPlan.activities?.length || 0} activities
                      </div>
                    </div>
                    {selectedDay === dayPlan.day && <CheckCircle className="h-5 w-5" />}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Day Details */}
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-white">
                  Day {selectedDay}: Adventure Awaits! 🌟
                </h3>
                {currentDay?.weatherSummary && (
                  <div className="text-right">
                    <div className="text-sm text-blue-300">Weather</div>
                    <div className="text-white font-semibold">{currentDay.weatherSummary.condition}</div>
                  </div>
                )}
              </div>

              {/* Activities from actual data */}
              <div className="space-y-6">
                {currentDay?.activities?.map((activity: any) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-2xl p-6 ${
                      activity.type === 'instagram' 
                        ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-300/30' 
                        : 'bg-white/10'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white mb-2">
                          {activity.title}
                        </h4>
                        <p className="text-blue-200 mb-3">
                          {activity.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-blue-300">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {activity.duration}
                          </span>
                          <span className="flex items-center">
                            <Star className="h-4 w-4 mr-1" />
                            {activity.rating}/5
                          </span>
                          {activity.timing && (
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {activity.timing}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right ml-6">
                        <div className="text-lg font-bold text-green-400">
                          ₹{activity.cost.toLocaleString()}
                        </div>
                        <div className="text-sm text-blue-300">per person</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {activity.type === 'instagram' && (
                          <span className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-xs font-semibold">
                            📸 Instagram Spot
                          </span>
                        )}
                        {activity.type === 'adventure' && (
                          <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-xs font-semibold">
                            🏖️ Adventure
                          </span>
                        )}
                        {activity.type === 'food' && (
                          <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-semibold">
                            🍽️ Cuisine
                          </span>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleViewDetails(activity)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold"
                        >
                          View Details
                        </button>
                        {activity.type === 'food' ? (
                          <button 
                            onClick={() => handleMakeReservation(activity)}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold"
                          >
                            Make Reservation
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleMakeReservation(activity)}
                            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold"
                          >
                            Book Now
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* AI Recommendations Section */}
        {itinerary.aiRecommendations && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-blue-300/30"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Sparkles className="h-6 w-6 mr-3 text-yellow-400" />
              🤖 AI Travel Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {itinerary.aiRecommendations.map((rec: string, idx: number) => (
                <div key={idx} className="bg-white/10 rounded-xl p-4">
                  <p className="text-blue-100 text-sm">{rec}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* One-Click Booking Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-lg rounded-3xl p-12 border border-green-300/30">
            <h2 className="text-4xl font-bold text-white mb-6">
              🚀 Ready to Make This Dream Real?
            </h2>
            <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
              Book your complete trip through EaseMyTrip with our exclusive AI-optimized packages. 
              Everything you need in just <span className="text-green-400 font-bold">one click!</span>
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center justify-center bg-white/10 rounded-xl p-4">
                <Plane className="h-6 w-6 text-blue-400 mr-3" />
                <span className="text-white font-semibold">Flights Included</span>
              </div>
              <div className="flex items-center justify-center bg-white/10 rounded-xl p-4">
                <Hotel className="h-6 w-6 text-purple-400 mr-3" />
                <span className="text-white font-semibold">Hotels Booked</span>
              </div>
              <div className="flex items-center justify-center bg-white/10 rounded-xl p-4">
                <Star className="h-6 w-6 text-yellow-400 mr-3" />
                <span className="text-white font-semibold">Activities Reserved</span>
              </div>
            </div>

            <motion.button
              onClick={handleBookTrip}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-6 px-12 rounded-2xl text-2xl shadow-2xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink className="h-8 w-8 inline mr-4" />
              ✈️ Book Complete Trip Now - ₹{itinerary.totalEstimatedCost?.toLocaleString() || userInput.budget.toLocaleString()}
            </motion.button>
            
            <p className="text-sm text-blue-300 mt-4">
              🔒 Secure booking through EaseMyTrip • 💳 All payment methods accepted • ✅ Instant confirmation
            </p>
          </div>
        </motion.div>
      </div>

      <ChatbotPopover /> 
    </div>
  )
}
