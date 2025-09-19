// src/components/features/trip-planner/ItineraryGenerator.tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Loader, Zap, Brain, Plane } from 'lucide-react'
import { adkService } from '@/lib/adk-service' 
import ItineraryDisplay from './ItineraryDisplay'

interface ItineraryGeneratorProps {
  userInput: {
    destination: string
    budget: number
    days: number
    groupSize: number
    personality: string
    preferences: string[]
  }
  onBack: () => void
}

export default function ItineraryGenerator({ userInput, onBack }: ItineraryGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStep, setCurrentStep] = useState('')
  const [itinerary, setItinerary] = useState(null)
  const [progress, setProgress] = useState(0)

  const generateSteps = [
    "🧠 Analyzing your travel personality...",
    "🌍 Scanning destinations and attractions...", 
    "💰 Optimizing your budget allocation...",
    "📸 Finding Instagram-worthy photo spots...",
    "🎯 Crafting personalized recommendations...",
    "⚡ Adding local insider secrets...",
    "🚀 Finalizing your perfect itinerary..."
  ]

 const generateItinerary = async () => {
    setIsGenerating(true)
    setProgress(0)
    
    try {
      // Animate through steps...
      // ...

      // Use the new service to generate the itinerary
      const result = await adkService.generateItinerary(userInput)
      setItinerary(result)
      
    } catch (error) {
      console.error('Generation failed:', error)
      setCurrentStep("🚨 Oops! Our AI is taking a coffee break. Try again!")
      setTimeout(() => setIsGenerating(false), 2000)
    }
  }
  if (itinerary) {
    return <ItineraryDisplay itinerary={itinerary} userInput={userInput} onBack={onBack} />
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatePresence mode="wait">
          {!isGenerating ? (
            // Pre-generation state
            <motion.div
              key="pre-generate"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-12"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="mb-8"
              >
                <Brain className="h-20 w-20 text-yellow-400 mx-auto" />
              </motion.div>
              
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Create Magic? ✨
              </h2>
              
              <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
                Our AI Travel Genius is about to analyze your personality, preferences, 
                and budget to create the most <span className="text-yellow-400 font-bold">epic itinerary</span> you've ever seen!
              </p>
              
              {/* Trip Summary */}
              <div className="bg-white/10 rounded-2xl p-6 mb-8 text-left max-w-2xl mx-auto">
                <h3 className="text-xl font-bold text-white mb-4">Your Trip Summary:</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-300">Destination:</span>
                    <span className="text-white ml-2 font-semibold">{userInput.destination}</span>
                  </div>
                  <div>
                    <span className="text-blue-300">Duration:</span>
                    <span className="text-white ml-2 font-semibold">{userInput.days} days</span>
                  </div>
                  <div>
                    <span className="text-blue-300">Budget:</span>
                    <span className="text-white ml-2 font-semibold">₹{userInput.budget.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-blue-300">Travelers:</span>
                    <span className="text-white ml-2 font-semibold">{userInput.groupSize} people</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-blue-300">Your Vibe:</span>
                    <span className="text-white ml-2 font-semibold capitalize">{userInput.personality}</span>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={generateItinerary}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-6 px-12 rounded-2xl text-xl shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="h-6 w-6 inline mr-3" />
                ✨ Generate My Epic Itinerary! ✨
              </motion.button>
            </motion.div>
          ) : (
            // Generation in progress
            <motion.div
              key="generating"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-12"
            >
              {/* Animated AI Icon */}
              <motion.div className="mb-8 relative">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                >
                  <Zap className="h-24 w-24 text-yellow-400 mx-auto" />
                </motion.div>
                
                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400 rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    animate={{
                      x: [0, Math.cos(i * 60 * Math.PI / 180) * 60],
                      y: [0, Math.sin(i * 60 * Math.PI / 180) * 60],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  />
                ))}
              </motion.div>

              <h2 className="text-4xl font-bold text-white mb-4">
                AI Travel Genius at Work! 🤖
              </h2>

              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl text-yellow-400 mb-8 font-semibold"
              >
                {currentStep}
              </motion.div>

              {/* Progress Bar */}
              <div className="w-full bg-white/20 rounded-full h-4 mb-8 overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/30"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.div>
              </div>

              <p className="text-blue-200 text-lg">
                Creating something <span className="text-yellow-400 font-bold">extraordinary</span> just for you...
              </p>

              {/* Fun facts while waiting */}
              <div className="mt-8 text-sm text-blue-300">
                <motion.div
                  key={Math.floor(progress / 20)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="italic"
                >
                  {progress < 20 && "Did you know? Our AI processes over 10,000 travel data points! 🤯"}
                  {progress >= 20 && progress < 40 && "Finding hidden gems that 99% of tourists miss! 💎"}
                  {progress >= 40 && progress < 60 && "Optimizing your budget like a financial wizard! 💰"}
                  {progress >= 60 && progress < 80 && "Adding Instagram spots that'll break the internet! 📸"}
                  {progress >= 80 && "Almost done... This is going to be EPIC! 🚀"}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
