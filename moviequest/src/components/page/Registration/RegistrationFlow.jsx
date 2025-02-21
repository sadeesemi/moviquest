import React, { useState, useEffect } from 'react';
import { RegistrationForm } from './RegistrationForm';
import { MoviePreferences } from './MoviePreferences';
import { ViewingHabits } from './ViewingHabits';
import { SuccessModal } from './SuccessModal';

export function RegistrationFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    registration: null,
    preferences: null,
    habits: null
  });

  const handleStepComplete = (stepData, step) => {
    setFormData(prev => ({
      ...prev,
      [step]: stepData
    }));
    
    if (step === 'habits') {
      setShowSuccess(true);
      // Redirect to login after 2 seconds
      setTimeout(() => {
        // Replace with your login route
        window.location.href = '/login';
      }, 2000);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  useEffect(() => {
    // Any necessary effect when switching between steps
  }, [currentStep]);

  return (
    <div className="w-full max-w-xl">
      {currentStep === 1 && (
        <RegistrationForm 
          initialData={formData.registration}
          onComplete={(data) => handleStepComplete(data, 'registration')} 
        />
      )}
      
      {currentStep === 2 && (
        <MoviePreferences 
          initialData={formData.preferences}
          onComplete={(data) => handleStepComplete(data, 'preferences')}
          onBack={handleBack}
        />
      )}
      
      {currentStep === 3 && (
        <ViewingHabits 
          initialData={formData.habits}
          onComplete={(data) => handleStepComplete(data, 'habits')}
          onBack={handleBack}
        />
      )}

      {showSuccess && <SuccessModal />}

      {/* Progress Indicator */}
      <div className="mt-6 flex justify-center gap-2">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`w-3 h-3 rounded-full ${
              step === currentStep
                ? 'bg-red-600'
                : step < currentStep
                ? 'bg-green-500'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
