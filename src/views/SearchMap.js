import React , { useRef, useEffect, useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import { Map, MapMarker } from "react-kakao-maps-sdk";


function SearchMap() {
    
    const [state, setState] = useState({
        // 지도의 초기 위치
        center: { lat: 37.49676871972202, lng: 127.02474726969814 },
        // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
        isPanto: true,
      });
    const [searchAddress, SetSearchAddress] = useState();
    const [position, setPosition] = useState();
    console.log(position);

    // 주소 입력후 검색 클릭 시 원하는 주소로 이동
    const SearchMap = () => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        
        let callback = function(result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
            const newSearch = result[0]
            setState({
                center: { lat: newSearch.y, lng: newSearch.x }
            })
        }
      };
        geocoder.addressSearch(`${searchAddress}`, callback);
    }
  
  const handleSearchAddress = (e) => {
    SetSearchAddress(e.target.value)
    console.log(e.target.value)
  }
    
    return(
        <div>
            <p>
                지도페이지 - 주소검색/키워드검색/실시간위치알아내기
            </p>
            <div style={{backgroundColor:"pink"}}>
                현재 해야하는 것 : <br/>
                * 어느 위치 클릭하면 마커가 생기도록!! -- 완료 <br/>
                1. 버튼 3개 중 하나 누르면 키워드 검색, 나머지 누르면 실시간 위치 알아내기<br/>
                2. 마커의 위치/정보 불러와서 (블로그 같은) input창에 넣기<br/>
                3. 사진 첨부/글 작성한거 localStorage에 저장한 다음 - 저장된 마커 누르면 <br/>
                (이 때 react-kakao-maps-sdk 이미지 마커와 커스텀 오버레이 참고)
                <br/> localStorage에 있던 해당 정보 나오게
            </div>
            
            <Map
                center={state.center}
                isPanto={state.isPanto}
                style={{ width: "500px", height: "500px", marginLeft:"auto", marginRight:"auto" }}
                onClick={(_t, mouseEvent) => setPosition({
                    lat: mouseEvent.latLng.getLat(),
                    lng: mouseEvent.latLng.getLng(),
                  })}
            >
                {/* 검색 결과 마커 */}
                <MapMarker position={state.center}>
                    <div style={{color:"#000"}}>검색 결과 위치</div>
                </MapMarker>

                {/* 지도 특정 장소 클릭 시 나타나는 마커 */}
                {position && <MapMarker position={position} />} 
            </Map>
            {position && <p>{'클릭한 위치의 위도는 ' + position.lat + ' 이고, 경도는 ' + position.lng + ' 입니다'}</p>}
            <div>
                <input onChange={handleSearchAddress} placeholder="검색할 주소를 입력하세요"/>
                <button onClick={SearchMap}>검색</button>
            </div>
        </div>
    )
}

export default SearchMap;