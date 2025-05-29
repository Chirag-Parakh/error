import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../constants/color';


interface Item {
    collegeid: string;
    collegeName: string;
    currentstrength: number;
}

interface Props {
    items: Item[];
    onItemSelect: (item: Item) => void;
    selectedItem?: Item;
    placeholder?: string;
}

const SearchableDropdown: React.FC<Props> = ({
    items,
    onItemSelect,
    selectedItem,
    placeholder = 'Select an item',
}) => {
    const [visible, setVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');


    const filteredItems = items.filter((item) =>
        item?.collegeName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelect = (item: Item) => {
        onItemSelect(item);
        setVisible(false);
        setSearchQuery('');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setVisible(true)}
            >
                <Text style={styles.selectedText}>
                    {selectedItem ? selectedItem.collegeName : placeholder}
                </Text>
                <AntDesign name="down" size={22} color="#666" style={styles.searchIcon} />
            </TouchableOpacity>

            <Modal visible={visible} transparent animationType="fade">
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.searchContainer}>
                            <AntDesign name="search1" size={22} color="#666" style={styles.searchIcon} />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search college..."
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                autoFocus
                            />
                        </View>


                        <FlatList
                            data={filteredItems}
                            keyExtractor={(item) => item.collegeid}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.item}
                                    onPress={() => handleSelect(item)}
                                    key={item.collegeid}
                                >
                                    <Text style={styles.itemText}>{item.collegeName}</Text>
                                </TouchableOpacity>
                            )}
                            style={styles.list}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    container: {
        width: '100%',
        marginBottom: 20,
    },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    selectedText: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: width * 0.9,
        maxHeight: height * 0.7,
        backgroundColor: colors.lightBG,
        borderRadius: 12,
        overflow: 'hidden',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    list: {
        maxHeight: height * 0.5,
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 4,
    },
    strengthText: {
        fontSize: 14,
        color: '#666',
    },
});

export default SearchableDropdown;