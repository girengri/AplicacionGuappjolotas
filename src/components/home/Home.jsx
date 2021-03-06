import React, { Component } from 'react'
import CategoriaProductos from './CategoriaProductos';
import Header from './Header';
import styled from 'styled-components'
import axios from 'axios'
import { Center } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';

const StyledHome = styled.header`
    padding: 24px 24px 24px 24px;
    background-color: #F2F2F2;
`
localStorage.setItem('productCategorie', "guajolotas")

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            categorie: localStorage.getItem('productCategorie'),
            loading: true,
            error: null,
            data: "",
            dataCategorie: []
        }
    }

    fetchProductosData = () => {
        this.setState({
            loading: true,
            error: null
        })

        axios
            .get(`https://api-guajolotas.herokuapp.com/${this.state.categorie}`)
            .then(res => {
                this.setState({
                    loading: false,
                    data: res.data
                })
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error: error
                })
            })
    }
    fetchProductosDataCategorie = () => {
        this.setState({
            loading: true,
            error: null
        })
        axios
            .get("https://api-guajolotas.herokuapp.com/categorias")
            .then(res => {
                this.setState({
                    loading: false,
                    dataCategorie: res.data
                })
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error: error
                })
            })
    }

    componentDidMount() {
        this.fetchProductosData()
        this.fetchProductosDataCategorie()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.categorie !== this.state.categorie) {
            this.fetchProductosData()
        }
    }

    handleClickSelection = (e, section) => {
        e.preventDefault()
        this.setState({
            categorie: section
        })
    }

    render() {

        if (this.state.loading && !this.state.data) {
            return (
                <Center>
                    <Spinner
                        thickness="4px"
                        speed="0.9s"
                        emptyColor="gray.200"
                        color="orange.400"
                        size="xl"
                        marginTop="100%" />
                </Center>
            )
        }
        if (this.state.error) {
            return <h1>Vaya vaya, en mi pc si funcionaba</h1>
        }
        return (
            <StyledHome>
                <Header />
                <CategoriaProductos section={this.state.categorie} productos={this.state.data} categorias={this.state.dataCategorie} onClick={this.handleClickSelection} />
            </StyledHome>
        )
    }
}

export default Home