import React from 'react';
import './BlurImage.less';

const BlurImage = ({ url }) => (
  <div className="BlurImage">
    <div className="target-image">
      <div className="frame">
        <div
          className="backgroud-image"
          style={{
            backgroundImage: `url('${url}')`,
          }}
        />
      </div>
    </div>
  </div>
);

export default BlurImage;
