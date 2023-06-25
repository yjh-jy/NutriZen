function rawToState(value) {
    let result;
    switch (true) {
      // lacking
      case (value === 0):
        result = 'lacking1';
        break;
      case (value >= 1 && value <= 8):
        result = 'lacking2';
        break;
      case (value >= 9 && value <= 16):
        result = 'lacking3';
        break;
      case (value >= 17 && value <= 24):
        result = 'lacking4';
        break;
      case (value >= 25 && value <= 32):
        result = 'lacking5';
        break;
      case (value >= 33 && value <= 40):
        result = 'lacking6';
        break;
      case (value >= 41 && value <= 48):
        result = 'lacking7';
        break;
      case (value >= 49 && value <= 56):
        result = 'lacking8';
        break;
      case (value >= 57 && value <= 64):
        result = 'lacking9';
        break;
      case (value >= 65 && value <= 72):
        result = 'lacking10';
        break;
      case (value >= 73 && value <= 79):
        result = 'lacking11';
        break;
  
      // sufficient
      case (value >= 80 && value <= 83):
        result = 'sufficient1';
        break;
      case (value >= 84 && value <= 86):
        result = 'sufficient2';
        break;
      case (value >= 87 && value <= 89):
        result = 'sufficient3';
        break;
      case (value >= 90 && value <= 92):
        result = 'sufficient4';
        break;
      case (value >= 93 && value <= 95):
        result = 'sufficient5';
        break;
      case (value >= 96 && value <= 100):
        result = 'sufficient6';
        break;
      case (value >= 101 && value <= 105):
        result = 'sufficient7';
        break;
      case (value >= 106 && value <= 108):
        result = 'sufficient8';
        break;
      case (value >= 109 && value <= 111):
        result = 'sufficient9';
        break;
      case (value >= 112 && value <= 114):
        result = 'sufficient10';
        break;
      case (value >= 115 && value <= 117):
        result = 'sufficient11';
        break;
      case (value >= 118 && value <= 120):
        result = 'sufficient12';
        break;
  
      // excessive
      case (value >= 121 && value <= 122):
        result = 'excessive1';
        break;
      case (value >= 123 && value <= 125):
        result = 'excessive2';
        break;
      case (value >= 126 && value <= 128):
        result = 'excessive3';
        break;
      case (value >= 129 && value <= 131):
        result = 'excessive4';
        break;
      case (value >= 132 && value <= 134):
        result = 'excessive5';
        break;
      case (value >= 135 && value <= 137):
        result = 'excessive6';
        break;
      case (value >= 138 && value <= 140):
        result = 'excessive7';
        break;
      case (value >= 141 && value <= 143):
        result = 'excessive8';
        break;
      case (value >= 144 && value <= 146):
        result = 'excessive9';
        break;
      case (value >= 147 && value <= 149):
        result = 'excessive10';
        break;
      case (value === 150):
        result = 'excessive11';
        break;
      case (value > 150):
        result = 'excessive12';
        break;
    };
    return result;
  
  };

export function updateNutrientBars(RNI, nutrientName, nutrientValue) {
    const value = Math.floor((nutrientValue / RNI[nutrientName])*100);
    const result = rawToState(value)
    return result
  };