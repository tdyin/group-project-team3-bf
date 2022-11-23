import { ReactElement, useState } from 'react';

//Custom Hook for Multi Step Form
const useMultiForm = (steps: ReactElement[]) => {
    const [currentStep, setCurrentStep] = useState(0); //Initialize to page first page

    const nextStep = () => {
        setCurrentStep((index: number) => {
            if(index >= steps.length - 1) {
                //If page tries to go to after last page
                return index;
            }
            //Return next page
            return index + 1;
        })
    }

    const backStep = () => {
        setCurrentStep((index: number) => {
            if(index <= 0) {
                //If page tries to go to before start
                return index;
            }
            //Return next page
            return index - 1;
        })
    }

    const goTo = (index: number) => {
        setCurrentStep(index);
    }

    return {        
            currentStep,
            step: steps[currentStep],
            isFirst: currentStep === 0,
            isLast: currentStep === steps.length - 1,
            steps,
            goTo,
            nextStep,
            backStep
        }
    
}

export default useMultiForm