import {useEffect, useState} from 'react';

import React from 'react'

const TabFocus = (props) => {
    const [tabHasFocus, setTabHasFocus] = useState(true);

  useEffect(() => {
    const handleFocus = () => {
      console.log('Tab has focus');
      setTabHasFocus(true);
    };

    const handleBlur = () => {
      alert("get back to class")
      console.log('Tab lost focus');
      setTabHasFocus(false);
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return (
    <div>
       {tabHasFocus ? (
        <h2></h2>
      ) : (
        <h2></h2>
      )}
    </div>
  );
}

export default TabFocus
