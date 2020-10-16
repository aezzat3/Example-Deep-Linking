import React, {useState, useEffect} from 'react';
import {ScrollView, Text, ActivityIndicator, View, Alert} from 'react-native';

const valueMap = {
  name: 'Name',
  height: 'Height',
  mass: 'Mass',
  hair_color: 'Hair Color',
  skin_color: 'Skin Color',
  eye_color: 'Eye Color',
  birth_year: 'Birth Year',
  gender: 'Gender',
};

export const PersonDetails = ({route}) => {
  const params = route.params || {};
  const {details = {}, id} = params;

  const [loading, setLoading] = useState(true);
  const [displayDetails, setDisplayDetails] = useState({});

  useEffect(() => {
    const hasDetails = Object.keys(details).length > 0;
    if (hasDetails) {
      setDisplayDetails(details);
      setLoading(false);
    } else if (id) {
      fetch(`https://swapi.dev/api/people/${id}`)
        .then((res) => res.json())
        .then((res) => {
          setDisplayDetails(res);
          setLoading(false);
        })
        .catch((error) => {
          Alert.alert('an error occurred! See console for more info.');
          console.log(error);
        });
    }
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      style={{backgroundColor: '#fff'}}
      contentContainerStyle={{
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}>
      {Object.keys(valueMap).map((key) => {
        if (!displayDetails[key]) {
          return null;
        }

        return (
          <Text style={{fontSize: 18, marginTop: 10}} key={key}>
            <Text style={{fontWeight: 'bold'}}>{`${valueMap[key]}: `}</Text>
            {displayDetails[key]}
          </Text>
        );
      })}
    </ScrollView>
  );
};
