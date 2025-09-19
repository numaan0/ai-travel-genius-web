// src/components/features/trip-planner/TripPlannerForm.tsx
'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowLeft, Plane, MapPin, Calendar, Users, DollarSign } from 'lucide-react'
import ItineraryGenerator from './ItineraryGenerator'


interface TripPlannerFormProps {
  personality: string;
}

export default function TripPlannerForm({ personality }: TripPlannerFormProps) {
  const [formData, setFormData] = useState({
    destination: '',
    budget: '',
    days: '',
    groupSize: 1,
    startDate: '',
    preferences: [] as string[]
  })
  const [showGenerator, setShowGenerator] = useState(false)


  // Replace this entire section with the safe version below
const personalityThemes = {
  adventure: {
    title: "Adventure Seeker 🏔️",
    color: "from-orange-500 to-red-600",
    suggestions: ["Hiking", "Mountain climbing", "Water sports", "Wildlife safari"]
  },
  luxury: {
    title: "Luxury Lover ✨", 
    color: "from-purple-500 to-pink-600",
    suggestions: ["Spa retreats", "Fine dining", "Premium hotels", "Private tours"]
  },
  cultural: {
    title: "Culture Explorer 🏛️",
    color: "from-blue-500 to-cyan-600", 
    suggestions: ["Museums", "Historical sites", "Local festivals", "Art galleries"]
  },
  party: {
    title: "Social Butterfly 🎉",
    color: "from-pink-500 to-yellow-500",
    suggestions: ["Nightlife", "Beach parties", "Music festivals", "Social events"]
  }
}

// ✅ SAFE ASSIGNMENT WITH FALLBACK
const currentTheme = personalityThemes[personality as keyof typeof personalityThemes] || {
  title: "Adventure Seeker 🏔️",
  color: "from-orange-500 to-red-600",
  suggestions: ["Hiking", "Mountain climbing", "Water sports", "Wildlife safari"]
}


  // const currentTheme = personalityThemes[personality as keyof typeof personalityThemes]

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  if (formData.destination && formData.budget && formData.days) {
    setShowGenerator(true)
  }
}
if (showGenerator) {
    return (
      <ItineraryGenerator 
        userInput={{
          destination: formData.destination,
          budget: parseInt(formData.budget),
          days: parseInt(formData.days),
          groupSize: formData.groupSize,
          personality,
          preferences: formData.preferences
        }}
        onBack={() => setShowGenerator(false)}
      />
    )
  }
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button 
            onClick={() => window.location.reload()}
            className="absolute top-4 left-4 text-white/60 hover:text-white p-2"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          
          <div className={`text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.color}`}>
            {currentTheme.title}
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Let's Plan Your Perfect Trip!
          </h1>
          <p className="text-blue-200">
            Tell us your preferences and our AI will create an amazing itinerary just for you
          </p>
        </motion.div>

        {/* Form */}
        <motion.form 
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Destination */}
            <div>
              <label className="block text-white font-semibold mb-2">
                <MapPin className="h-5 w-5 inline mr-2" />
                Where do you want to go?
              </label>
              <input
                type="text"
                placeholder="e.g., Paris, Tokyo, Goa"
                className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-white/50 focus:outline-none"
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
                required
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-white font-semibold mb-2">
                <DollarSign className="h-5 w-5 inline mr-2" />
                What's your budget?
              </label>
              <input
                type="number"
                placeholder="₹50,000"
                className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-white/50 focus:outline-none"
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                required
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-white font-semibold mb-2">
                <Calendar className="h-5 w-5 inline mr-2" />
                How many days?
              </label>
              <input
                type="number"
                placeholder="7"
                min="1"
                max="30"
                className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-white/50 focus:outline-none"
                value={formData.days}
                onChange={(e) => setFormData({...formData, days: e.target.value})}
                required
              />
            </div>

            {/* Group Size */}
            <div>
              <label className="block text-white font-semibold mb-2">
                <Users className="h-5 w-5 inline mr-2" />
                How many people?
              </label>
              <input
                type="number"
                placeholder="2"
                min="1"
                max="20"
                className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-white/50 focus:outline-none"
                value={formData.groupSize}
                onChange={(e) => setFormData({...formData, groupSize: parseInt(e.target.value)})}
                required
              />
            </div>
          </div>

          {/* Preferences based on personality */}
          <div className="mt-6">
            <label className="block text-white font-semibold mb-4">
              What interests you most? (Select all that apply)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {currentTheme.suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    const newPrefs = formData.preferences.includes(suggestion)
                      ? formData.preferences.filter(p => p !== suggestion)
                      : [...formData.preferences, suggestion]
                    setFormData({...formData, preferences: newPrefs})
                  }}
                  className={`p-3 rounded-xl border transition-all ${
                    formData.preferences.includes(suggestion)
                      ? `bg-gradient-to-r ${currentTheme.color} text-white border-white/50`
                      : 'bg-white/10 text-white border-white/20 hover:border-white/40'
                  }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className={`w-full mt-8 py-6 bg-gradient-to-r ${currentTheme.color} text-white font-bold text-xl rounded-2xl shadow-2xl`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plane className="h-6 w-6 inline mr-3" />
            ✨ Generate My AI Itinerary ✨
          </motion.button>
        </motion.form>
      </div>

    </div>
    
  )
}
