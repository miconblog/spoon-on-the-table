import Link from 'next/link'
import { Button } from 'antd'

export default () => (
  <div id="about" className="intro">
    <h2><strong>TableSpoon</strong>을<br />소개합니다.</h2>

    <div>
      <p>
        <strong>TableSpoon</strong>은 내가 만든 음식을 여행자에게 제공합니다. <br />
        음식 솜씨가 특별하지 않아도 됩니다. <q>차려놓은 밥상위에 숟가락 하나만 더 놓아보세요.</q><br />
        누구나 호스트가 될 수 있으며, 전세계 수많은 여행자들과 친구가 될수 있습니다.<br />
      </p>

      <p>
        다른 나라를 여행중이라면 꼭 <strong>TableSpoon</strong>을 검색해보세요. <br />
        세계의 수많은 호스트들이 여러분을 기다리고 있습니다. <br />
        현지인들이 내어주는 가정식은 평범하지만 그 경험은 결코 평험하지 않을 것입니다.
      </p>

      <p>
        세상을 여행하는 또다른 방법 <strong>TableSpoon</strong>과 함께 하세요!
      </p>

    </div>

    <Button size="large" style={{width: 200}}>호스트 되기</Button>

    <style jsx>{`
      #about {
        font-size: 16px;
        width: 800px;
        padding-bottom: 50px;

        strong {
          font-weight: bold;
          color: #4a4a4a;
        }
      }

      
    `}</style>
  </div>
)