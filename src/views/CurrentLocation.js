import React , { useState, useEffect } from "react";
// import { Routes, Route, Link } from 'react-router-dom';
import { Map, MapMarker } from "react-kakao-maps-sdk";


function CurrentLocation() {
   
  let [showMap, setShowMap] = useState(false);
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(()=>{
    // 1초 후에 지도창이 보이게 - 지도 container 렌더링 될 수 있게
    const mapTimeout = setTimeout(()=>{
        setShowMap(true);
    }, 1500);
    return () => {clearTimeout(mapTimeout)};
  });
  
  function getCurrentBtn() {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }))
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }))
        }
      )
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을 때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }))
    }
  }

    return(
        <>
          <p>
            <br/>
            아래 버튼을 클릭하여 현위치를 표시해보세요!<br/>
            오류가 발생할 수 있으니 해당 페이지 접속 전에 반드시 위치 정보 이용 동의를 해주세요.<br/>
            크롬, edge 브라우저의 경우 주소창 맨 왼쪽 ⓘ버튼을 누르면 빠르게 위치 정보 이용 동의를 할 수 있습니다.<br/>
            주소를 따로 검색할 필요없이 현위치 검색으로 빠르게 기록해보세요😊
            <br/>
          </p>

          <button onClick={getCurrentBtn}>내 위치 가져오기</button>
          <br/><br/>
          {/* 1초 후에 <Map>표시 */}
          {showMap && <Map // 지도를 표시할 Container
            center={state.center}
            style={{
              // 지도의 크기
              width: "500px",
              height: "500px",
              marginLeft: "auto",
              marginRight: "auto"
            }}
            level={3} // 지도의 확대 레벨
          >
            {!state.isLoading && <MapMarker position={state.center}>
              <div style={{ padding: "5px", color: "#000" }}>
                {state.errMsg ? state.errMsg : "여기에 계신가요?!"}
              </div>
            </MapMarker>}
          </Map>}
          <br/><br/>
        </>
    );
};

export default CurrentLocation;