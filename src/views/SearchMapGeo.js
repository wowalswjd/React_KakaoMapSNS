import React , { useRef, useEffect, useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Form from 'react-bootstrap/Form';


function SearchMapGeo() {
    
    const [state, setState] = useState({
        // 지도의 초기 위치
        center: { lat: 37.5625257907305, lng: 126.94766368999385 },
        // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
        isPanto: true,
      });
    const [searchAddress, SetSearchAddress] = useState(); // 검색창에서 입력한 값 state 저장
    const [position, setPosition] = useState(); // 마커의 위치 경위도 state 저장
    const [isOpen, setIsOpen] = useState(false); // 마커 클릭 시 모달창 state 저장
    // console.log(position);

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

    // 검색창에 입력된 값 searchAddress변수에 넣어주는 handler 함수
    const handleSearchAddress = (e) => {
        SetSearchAddress(e.target.value)
        console.log(e.target.value)
    }

    // 마커 클릭하면 말풍선 띄우기 + 한번 더 클릭하면 말풍선 없애기
    const markerClickSwitch = () => {
        if(isOpen === true) {
            setIsOpen(false);
          } else setIsOpen(true);
    }
    
    return(
        <div>
            <p>
                <br/>
                검색창에 주소를 입력해주세요!<br/>
                주소를 검색하신 뒤 주변 근처에 마커를 표시할 수 있습니다!<br/>
                마커를 클릭하여 추억이 담긴 게시글을 작성해주세요😊
            </p>
            
            {/* 주소 검색창 */}
            <div>
                <input onChange={handleSearchAddress} placeholder="검색할 주소를 입력하세요"/>
                {/* <Form.Control type="sm" onChange={handleSearchAddress} placeholder="검색할 주소를 입력하세요" /> */}
                <button onClick={SearchMap}>검색</button>
            </div>
            <br/>
            
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
                    <div style={{color:"#000"}}>
                        검색 결과가 맞나요?<br/>
                        <button>마커 저장하기</button><br/>
                        <button>게시글 작성하기</button><br/>
                        <button>작성된 게시글 보기</button>
                    </div>
                </MapMarker>

                {/* 지도 특정 장소 클릭 시 나타나는 마커 */}
                {position && <MapMarker 
                    position={position}
                    clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
                    onClick={ () => {markerClickSwitch()} }
                >
                    {isOpen ? (
                        <div>
                            클릭한 위치가 맞나요?<br/>
                            <button>마커 저장하기</button><br/>
                            <button>게시글 작성하기</button><br/>
                            <button>작성된 게시글 보기</button>
                        </div>
                    )
                    
                    : null}
                </MapMarker>} 
            </Map>
            {position && <p>{'클릭한 위치의 위도는 ' + position.lat + ' 이고, 경도는 ' + position.lng + ' 입니다.'}</p>}
            <br/><br/>
        </div>
    )
}

export default SearchMapGeo;