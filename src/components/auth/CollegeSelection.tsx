// import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCollege } from '../../hooks/useCollege';
import AuthScreenWrapper from '../common/AuthScreenWrapper';
import CustomButton from '../ui/Button';
import SearchableDropdown from '../ui/SearchableDropdown';

interface Props {
    onNext: () => void;
    update: (data: { college: string }) => void;
}
const { height: screenHeight } = Dimensions.get('window');


interface collegesData {
    collegeid: string,
    collegeName: string,
    currentstrength: number
}

const CollegeSelection: React.FC<Props> = ({ onNext, update }) => {
    const [college, setCollege] = useState<collegesData>();
    const [collegesList, setCollegesList] = useState<collegesData[]>([])
    const { getCollegesData } = useCollege();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCollegesData();
                setCollegesList(data.data)
                console.log(data);
            } catch (err) {
                console.log(err);
            } finally {

            }
        };
        fetchData();
    }, [getCollegesData]);

    const handleNext = () => {
        update({ college: college?.collegeName || '' });
        onNext();
    };
    return (
        <AuthScreenWrapper>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.heading}>Let’s</Text>
                    <Text style={styles.subheading}>
                        <Text style={styles.highlight}>Select</Text> your College
                    </Text>
                    <SearchableDropdown
                        items={collegesList}
                        onItemSelect={(item) => { setCollege(item); }}
                        selectedItem={college}
                        placeholder="Tap to search"
                    />
                    <TouchableOpacity
                        style={styles.clear}
                        onPress={() => setCollege(undefined)}
                    >
                        <Text style={styles.clearText}>Clear Choice</Text>
                    </TouchableOpacity>
                    <CustomButton title="Save College" disabled={!!!college} onPress={handleNext} />
                </View>
            </View>
        </AuthScreenWrapper>
    );
};

export default CollegeSelection;


const styles = StyleSheet.create({
    clear: {
        // marginTop: - 20,
        marginRight: 10
    },
    clearText: {
        textAlign: 'right',
        color: '#00C853'
    },
    container: { flex: 1, justifyContent: 'space-evenly' },
    textContainer: {
        flex: 1,
        height: screenHeight * 0.5,
        justifyContent: 'flex-start',
        gap: 12,
    },
    heading: { fontSize: 38, marginBottom: -8, fontWeight: '600' },
    subheading: { fontSize: 38, marginBottom: 8, fontWeight: '600' },
    highlight: { color: '#00C853' /* e.g. colors.green */ },
});