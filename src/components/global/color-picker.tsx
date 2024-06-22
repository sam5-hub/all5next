"use client"
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Slider, Sketch, Material, Colorful, Compact, Circle, Wheel, Block, Github, Chrome } from '@uiw/react-color';

type ColorPickerType = {
    onCallback : (hex: string)=> void
}
function ColorPicker(prop: ColorPickerType) {
    const [hex, setHex] = useState("#fff");
    const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  return (
    <div>
      <Button variant={"outline"} onClick={handleClick} style={{ marginBottom: '20px' }}>
        Pick Color
      </Button>
      {displayColorPicker && (
        <div style={{ position: 'absolute', zIndex: '2' }}>
          <div style={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' }} onClick={handleClose} />
          <Sketch
            style={{ marginLeft: 20 }}
            color={hex}
            onChange={(color) => {
                setHex(color.hexa);
                // setDisplayColorPicker(false);
                prop.onCallback(color.hexa);
            }}
            />
        </div>
      )}
    </div>
  );
}

export default ColorPicker;

