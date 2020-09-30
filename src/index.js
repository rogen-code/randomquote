import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';



const App = () => {

    const[quote, setQuote] = useState({color: 'rgba(210, 145, 188, 1)'});

    

    useEffect(() => {
        axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
            .then(res => {
                const data = res.data;
                const number = Math.floor(Math.random()*101)+1;
                let colors = ['rgba(149, 125, 173, 1)', 'rgba(210, 145, 188, 1)', 'rgba(195, 60, 35, 1)', 'rgba(52, 123, 152, 1)', 'rgba(102, 176, 50, 1)', 'rgba(9, 40, 52, 1)', 'rgba(35, 153, 151, 1)', 'rgba(60, 68, 90, 1)', 'rgba(183, 107, 102, 1)', 'rgba(138, 150, 40, 1)']
                setQuote({
                    data: data,
                    quote: data.quotes[number].quote,
                    author: data.quotes[number].author,
                    appear: true,
                    color: colors[Math.floor(Math.random() * (10))]
                })
            })
    }, [])


    const clickHandler = () => {
        const newNumber = Math.floor(Math.random()*101)+1;
        let colors = ['rgba(149, 125, 173, 1)', 'rgba(210, 145, 188, 1)', 'rgba(195, 60, 35, 1)', 'rgba(52, 123, 152, 1)', 'rgba(102, 176, 50, 1)', 'rgba(9, 40, 52, 1)', 'rgba(35, 153, 151, 1)', 'rgba(60, 68, 90, 1)', 'rgba(183, 107, 102, 1)', 'rgba(138, 150, 40, 1)']
        setQuote({
            ...quote,
            appear: false
        })

        console.log('For Git')

        setTimeout(() => setQuote({
            ...quote,
            quote: quote.data.quotes[newNumber].quote,
            author: quote.data.quotes[newNumber].author,
            appear: true,
            color: colors[Math.floor(Math.random() * (10))]
        }), 1000
        )
    }



      
    return (
        <>

            <Content quote={quote.quote} author={quote.author} onClick={clickHandler} appear={quote.appear} colorHex={quote.color} />       
       
        </>
    )
}

const Content = ( {quote, author, onClick, appear, colorHex} ) => {

    const style = {
        color: colorHex
    }

        const backstyle =  useSpring({
            from: { backgroundColor: 'blue' },
            to: {  backgroundColor: colorHex},
            config: {
                mass: 5,
                tension: 50,
                friction: 25,
                clamp: true
            }
      });



      function whiteSpace(str) {
        if (str !== undefined) {
            return str.replace(/\s+/g, '%20')
        }
      }



      const TwitterURL = whiteSpace(quote) + (' ') + whiteSpace(author)

    
  

    

    return (

    <animated.div class="screen-container" style={backstyle}>
            <div className= {`quote-container bg-light  
                ${appear ? 'fade-in' : 'fade-exit'}`}>
                <div class="top">
                    <div class="title-container">
                        <h1 style={style} ><i class="fas fa-quote-left"></i> {quote}</h1>
                    </div>
                    <div class="author-container">
                        <h3 style={style}>- {author}</h3>
                    </div>
                </div>
                <div class="btm">
                    <div class="btm-left">
                        <a class="twitter-share-button"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://twitter.com/intent/tweet?text=${TwitterURL}`}
                            style={style}
                            >
                        <i class="fab fa-twitter"></i>
                        </a>
                        <div  data-href="https://www.wikipedia.org/" data-layout="button" data-size="small">
                            <a target="_blank" style={style} rel="noopener noreferrer" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.wikipedia.org%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore"><i class="fab fa-facebook-f"></i>
                            </a>
                        </div>
                    </div>
                    <div class="btm-right">
                        <button type="button" style={style} onClick={onClick}>New Quote</button>
                    </div>
                </div>
            </div>

    </animated.div>
    )
}








ReactDOM.render(<App />, document.querySelector('#root'));