import React, { useContext, useState } from 'react';
import { View, Text, Picker } from 'react-native';
import { AppContext } from '../../context/AppContext';

const DistanceFilter = () => {
  const { setDistanceFilter } = useContext(AppContext);
  const [selectedDistance, setSelectedDistance] = useState(10);

  const handleDistanceChange = (value) => {
    setSelectedDistance(value);
    setDistanceFilter(value);
  };

  return (
    <View>
      <Text>Filtrar ofertas por distancia:</Text>
      <Picker
        selectedValue={selectedDistance}
        onValueChange={(value) => handleDistanceChange(value)}
      >
        {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((distance) => (
          <Picker.Item key={distance} label={`${distance} km`} value={distance} />
        ))}
      </Picker>
    </View>
  );
};

export default DistanceFilter;