import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1A',
    paddingHorizontal: 20,
    paddingBottom: '100%',
  },
  image: {
    marginTop: 10,
    width: 320,
    height: 350,
    borderRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#C1EA5F',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#C1EA5F',
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#C1EA5F',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    marginTop: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText2: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reviewContainer: {
    width: 350,
    marginTop: 40,
    color: 'white',
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#C1EA5F',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  ratingText: {
    marginRight: 5,
    fontWeight: 'bold',
    color: 'white',
  },
  starButton: {
    marginRight: 5,
  },
  reviewInput: {
    width: '100%',
    height: 200,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: 'white',
  },
  inputPlaceholder: {
    color: '#999', 
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'white',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#C1EA5F',
  },
});
