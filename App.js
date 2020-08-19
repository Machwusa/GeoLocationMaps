import React from 'react';
import {StyleSheet} from 'react-native';
import MapView from "react-native-maps/index";

import * as Location from 'expo-location';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: -25.9065598,
                longitude: 28.0968273,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0922,
            },
            coordinate: {
                latitude: -25.9065598,
                longitude: 28.0968273,
            }
        };
    }

    componentDidMount() {

        Location.requestPermissionsAsync()
            .then(r => console.log("status: " + r.status))
            .catch((error)=>{
                console.log(error)});

        navigator.geolocation.watchPosition((position) => {
            console.log(position);
            this.map.animateToRegion({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            });
        }, (error) => console.log(error.message),
            {enableHighAccuracy: false, timeout: 200000, maximumAge: 1000},
            );
    }

    render() {
        return (
            <MapView
                ref={ref => {
                    this.map = ref;
                }}
                style={styles.container}
                showsUserLocation={true}
                followsUserLocation={true}
                initialRegion={this.state.region}>

                <MapView.Marker coordinate={this.state.coordinate}/>

            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
