import { initStore } from '../redux/store';
import withRedux from '../redux/withRedux';
import { MyPageLayout } from '../layouts';
import Markdown from 'react-markdown';
import { Card, Avatar } from 'antd';

const MyTables = ({ loginUser }) => (
  <MyPageLayout>
    <ul>
      <li>1. 호스트 소개</li>
      <li>2. 기본 사항</li>
      <li>3. 상세 정보</li>
      <li>4. 손님 맞이</li>
    </ul>

    <main className="page-my-table-content">
      <h1>호스팅하기</h1>
      <div className='markdown'>
        <Markdown source={`

        # 기본사항 
         - 장소를 선택하세요. 
          - 일단 주소를 입력,
          - 지도위에 위치가 정확한가요? 핀을 조정하세요!
          - 예약이 확정된 게스트만 핀을 볼수 있습니다.

         - 게스트는 몇명까지 받을수 있나? 

         - 메뉴 구성 
           - 시작 에피타이져
           - 메인요리
           - 사이드
           - 후식/디저트
           - 음료
           - 술 ( 불포함 / 주류반입금지 / 개인주류허용 )

         - 시작과 종료
          - 시작 시간에 따라 (타입이 자동 선택)
          - 아침, 브런치, 점심, 저녁, 야식 (중요하지 않으니까 안넣어도 될듯)

         - 사용언어
          - 한국어, 영어
        
        

        ## 상세 정보
         - 사진, 간단한 설명, 제목

         1. 당신의 테이블 주제를 입력주세요. 
         '아침에 내려주는 커피한잔과 빵의 여유!'

         2. 메뉴를 구성한 테이블 사진을 올려주세요. 
         
         3. 그밖에 사진을 5장까지 올릴수 있습니다. 

         4. 테이블 컨셉을 설명해주세요. 
          
         5. 어떤 손님을 기대합니까? 


        ## 게스트 맞이
         - 예약 설정 
         - 달력 
         - 요금


         1. 호스팅 할수 있는 날짜를 모두 골라주세요. 
          - 전체 선택
          - 특정기간 선택 
          - 전체 선택후 특정기간 제외

         2. 가격은 얼마로 할까요?

      
        9. 당신이 할수있는 요리와 함께 상차림된 테이블을 찍어주세요. 
          - 사진은 최대 5장 
          - 호스트 얼굴 사진은... 프로필로 충당 


        
     `} />
      </div>
    </main>

  </MyPageLayout>
);

MyTables.getInitialProps = async function ({ query, req, store }) {

  console.log('MyTables', query)
  return {
    loginUser: store.getState().loginUser
  };
};

export default withRedux(initStore)(MyTables);
