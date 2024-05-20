import { useEffect, useState } from "react";
import { Text, View, Button, Alert, StyleSheet } from "react-native";
import BadgerSaleItem from "./BadgerSaleItem";

export default function BadgerMart(props) {
    const [items, setItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState('');
    const [cart, setCart] = useState({});



    useEffect(() => {
        fetch("https://cs571.org/api/s24/hw7/items", {
            headers: {
                "X-CS571-ID": "bid_e5c17fa842e9e34246e0da9d18c22b2ea6fe5d66d8ed25f597bd150ed148f8b6"
            }
        })
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setCurrentIndex(0);

            })
    }, []);

    const goToNextItem = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % items.length);
    };

    const goToPreviousItem = () => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + items.length) % items.length);
    };


    const addItem = (itemKey) => {
        const updatedQuantity = (cart[itemKey] || 0) + 1;
        setCart({ ...cart, [itemKey]: updatedQuantity });
    }

    const removeItem = (itemKey) => {
        const updatedQuantity = (cart[itemKey] || 0) - 1;
        if (updatedQuantity <= 0) {
            const newCart = { ...cart };
            delete newCart[itemKey];
            setCart(newCart);
        } else {
            setCart({ ...cart, [itemKey]: updatedQuantity });
        }
    }

    const totalMoney = () => {
        return Object.entries(cart).reduce(
            (total, [key, quantity]) => total + quantity * items[key].price,
            0
        );
    };

    const numItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
    const totalCost = totalMoney();

    const orderConfirm = () => {
        Alert.alert('Order Confirmed!', `Your order contains ${numItems} items and costs $${totalCost.toFixed(2)}!`);
        setCurrentIndex(0);
        setCart(0);
    }

    const currentQuantity = cart[currentIndex] || 0;
    const currentItem = items[currentIndex];
    const hasPrevious = currentIndex === 0;
    const hasNext = currentIndex + 1 === items.length;
    const canAdd = currentItem && currentQuantity === Number(currentItem.upperLimit);
    const canRemove = currentQuantity === 0


    return (
        <View style={{ padding: 20 }}>
            <Text style={{ alignSelf: 'center', fontSize: 30}}>Welcome to Badger Mart!</Text>
            <View style={styles.buttonContainer}>
                <Button disabled={hasPrevious} title="Previous" onPress={goToPreviousItem} />
                <Button disabled={hasNext} title="Next" onPress={goToNextItem} />
            </View>
            {currentItem && (
                <BadgerSaleItem key={currentItem.name} {...currentItem} />
            )}
            

            <View style={styles.button}>
                <Button disabled={canRemove} title="Remove" onPress={() => removeItem(currentIndex)} />
                <Text style={{ alignSelf: 'center' }}> {currentQuantity}</Text>
                <Button disabled={canAdd} title="Add" onPress={() => addItem(currentIndex)} />
                <Text style={{ alignSelf: 'center' }}>You have {numItems} item(s) costing ${totalCost} in your cart!</Text>
                <Button disabled={numItems === 0} title="Place ORDER" onPress={orderConfirm} />
            </View>
        </View>
    );
            }
    const styles = StyleSheet.create({
        buttonContainer: {
            flexDirection: 'row', // Arrange buttons in a row
            justifyContent: 'space-between', // Place content at the edges
            alignItems: 'center', // Vertically center align items
            marginHorizontal: 10, // Adjust based on your layout needs
        },
        button: {
            alignItems: 'center',
            marginBottom: 30,
        }       
    })

