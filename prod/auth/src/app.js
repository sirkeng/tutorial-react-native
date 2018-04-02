import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from "firebase";
import { Header, Button, Card, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
	state = { loggedIn: null }


	componentWillMount() {
		firebase.initializeApp({
		    apiKey: "AIzaSyA_j3xdKDbQxWK5SQZixC3dA4tMdHIMujw",
		    authDomain: "auth-9a5fc.firebaseapp.com",
		    databaseURL: "https://auth-9a5fc.firebaseio.com",
		    projectId: "auth-9a5fc",
		    storageBucket: "auth-9a5fc.appspot.com",
		    messagingSenderId: "1098772725405"
	  });

		firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				this.setState({ loggedIn: true });
			}else{
				this.setState({ loggedIn: false });
			}
		});
	}

	renderContent() {
		switch (this.state.loggedIn) {
			case true:
				return (
					<Card>
						<CardSection>
							<Button onPress={() => firebase.auth().signOut()}>
								Log Out
							</Button>
						</CardSection>
					</Card>
				);
			case false:
				return <LoginForm />;
			default:
				return <Card><CardSection><Spinner size='large' /></CardSection></Card>;
		}
	}

	render() {
		return (
			<View>
				<Header headerText='Authentication' />
				{this.renderContent()}
			</View>
		);
	}
}

export default App;