import React, { Component } from 'react';
import Navbar from './Navbar';
import ColorBox from './ColorBox'
import Footer from './Footer';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteStyles';

class SingleColorPalette extends Component {
    constructor(props){
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.state={format: "hex"};
        this.changeFormat = this.changeFormat.bind(this)
    }
    gatherShades(palette, colorToFilterBy) {
        let shades =[];
        let allColors = palette.colors;
        for (let key in allColors) {
            shades = shades.concat(allColors[key].filter(color => color.id === colorToFilterBy))
        }
        return shades.slice(1);
    }
    changeFormat(val) {
        this.setState({format: val})
    }
    render() {
        const {paletteName, emoji, id} = this.props.palette;
        const {classes} = this.props
        const {format} = this.state;
        const colorBoxes = this._shades.map(color => (
            <ColorBox 
                key={color.name}
                name={color.name}
                background={color[format]}    
                showLink={false}
            />
        ))
        return (
            <div className={classes.Palette}>
                <Navbar handleChange={this.changeFormat} showingAllColors={false}/>
                <div className={classes.colors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`}>GO BACK</Link>
                    </div>
                </div>
                <Footer paletteName={paletteName} emoji={emoji}/>
            </div>
        );
    }
}

export default withStyles(styles)(SingleColorPalette);