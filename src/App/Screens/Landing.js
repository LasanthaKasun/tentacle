import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import AppBarLine from "../Components/AppBarLine/AppBarLine";
import { GOOGLE_API_KEY } from "../Config";
import { usePlacesWidget } from "react-google-autocomplete";
import Marker from "../Components/Marker/Marker";
import { useDispatch, useSelector } from "react-redux";
import { setMapFilterData } from "../Actions/mapFilterAction";
import LocationList from "../Components/LocationList/LocationList";
import { Col, Layout, Row, Space } from "antd";

const Landing = () => {
  const [location, setLocation] = useState({
    lat: 6.9271,
    lng: 79.8612,
  });

  const { searchLocation } = useSelector((state) => state.searchData);

  const dispatch = useDispatch();

  const { ref } = usePlacesWidget({
    apiKey: GOOGLE_API_KEY,
    onPlaceSelected: (place) => {
      dispatch(setMapFilterData(place.formatted_address));
      let newObj = JSON.parse(JSON.stringify(place?.geometry?.location));
      setLocation({
        lat: newObj.lat,
        lng: newObj.lng,
      });
      ref.current.value = "";
    },
  });

  return (
    <Space
      direction="vertical"
      style={{ width: "100%", height: "100%" }}
      size={[0, 48]}
    >
      <Layout>
        <AppBarLine title="Google Location Finder" />
        <Row style={contentStyle}>
          <Col span={16}>
            <div style={searchCmp}>
              <input ref={ref} style={searchCmp.input}/>
            </div>
            <GoogleMapReact
              yesIWantToUseGoogleMapApiInternals
              bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
              center={location}
              zoom={11}
            >
              <Marker
                lat={location.lat}
                lng={location.lng}
                markerId={location.lat}
              />
            </GoogleMapReact>
          </Col>
          <Col span={8} style={searchHistory}>
            <div style={searchHistory.innerContent}>
              <LocationList data={searchLocation} />
            </div>
          </Col>
        </Row>
      </Layout>
    </Space>
  );
};

const contentStyle = {
  height: "calc(100vh - 64px)"
};
const searchCmp = {
  position: "absolute",
  zIndex: 10,
  padding: 10,
  input: {
    height: 40,
    width: "calc(100vw / 5)",
    outline: "none",
    border: 0,
    borderRadius: 10,
    padding: 10,
  }
};
const searchHistory = {
  backgroundColor: "#9cc0f9",
  innerContent: {
    padding: 20,
  }
}

export default Landing;
