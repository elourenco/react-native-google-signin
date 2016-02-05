'use strict';

var React = require('react-native');
var { NativeAppEventEmitter } = require('react-native');
var { DeviceEventEmitter } = require('react-native');

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

var {
  AppRegistry,
  StyleSheet,
  PropTypes,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  DeviceEventEmitter
} = React;


class RNGoogleSiginExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this._configureOauth();
    GoogleSignin.currentUserAsync().then((user) => {
      this.setState({user: user});
    })
  }

  render() {
    if (!this.state.user) {
      return (
        <View style={styles.container}>
          <GoogleSigninButton style={{width: 120, height: 44}} color={GoogleSigninButton.Color.Light} size={GoogleSigninButton.Size.Icon} onPress={() => { this._signIn(); }}/>
        </View>
      );
    }

    if (this.state.user) {
      return (
        <View style={styles.container}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>Welcome {this.state.user.name}</Text>
          <Text>Your email is: {this.state.user.email}</Text>

          <TouchableOpacity onPress={() => {this._signOut(); }}>
            <View style={{marginTop: 50}}>
              <Text>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }

  _configureOauth(clientId, scopes=[]) {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/calendar'],
      webClientId: '867788377702-gmfcntqtkrmdh3bh1dat6dac9nfiiku1.apps.googleusercontent.com'
    });

    return true;
  }

  _signIn() {
    GoogleSignin.signIn()
    .then((user) => {
      this.setState({user: user});
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  _signOut() {
    GoogleSignin.signOut().then(() => {
      this.setState({user: null});
    })
    .done();
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('RNGoogleSiginExample', () => RNGoogleSiginExample);
