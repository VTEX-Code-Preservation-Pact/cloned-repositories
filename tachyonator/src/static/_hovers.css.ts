export default `
.dim {
  opacity: 1;
  transition: opacity .15s ease-in;
}
.dim:hover,
.dim:focus {
  opacity: .5;
  transition: opacity .15s ease-in;
}
.dim:active {
  opacity: .8; transition: opacity .15s ease-out;
}

.glow {
  transition: opacity .15s ease-in;
}
.glow:hover,
.glow:focus {
  opacity: 1;
  transition: opacity .15s ease-in;
}

.hide-child .child {
  opacity: 0;
  transition: opacity .15s ease-in;
}
.hide-child:hover  .child,
.hide-child:focus  .child,
.hide-child:active .child {
  opacity: 1;
  transition: opacity .15s ease-in;
}

.underline-hover:hover,
.underline-hover:focus {
  text-decoration: underline;
}

.grow {
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: transform 0.25s ease-out;
}
.grow:hover,
.grow:focus {
  transform: scale(1.05);
}
.grow:active {
  transform: scale(.90);
}

.grow-large {
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: transform .25s ease-in-out;
}
.grow-large:hover,
.grow-large:focus {
  transform: scale(1.2);
}
.grow-large:active {
  transform: scale(.95);
}

.pointer:hover {
  cursor: pointer;
}

.shadow-hover {
  cursor: pointer;
  position: relative;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.shadow-hover::after {
  content: '';
  box-shadow: 0px 0px 16px 2px rgba( 0, 0, 0, .2 );
  border-radius: inherit;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: opacity 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.shadow-hover:hover::after,
.shadow-hover:focus::after {
  opacity: 1;
}

.bg-animate,
.bg-animate:hover,
.bg-animate:focus {
  transition: background-color .15s ease-in-out;
}
`
