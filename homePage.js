import * as THREE from './three.js-master/build/three.module.js'
import * as THREEE from './three.js-master/examples/jsm/loaders/FontLoader.js'
import * as THREEEE from './three.js-master/examples/jsm/geometries/TextGeometry.js'

var w,h,aspect;
var persCam,scene,renderer;

let init = () =>{
    w = window.innerWidth
    h = window.innerHeight
    aspect = w/h

    persCam = new THREE.PerspectiveCamera(45,aspect,0.1,100)
    scene = new THREE.Scene()
    renderer = new THREE.WebGLRenderer({antialias:true})  
    
    renderer.setSize(w,h)
    renderer.setClearColor("brown")
    document.body.appendChild(renderer.domElement)
}

window.onresize = () => {
    w = window.innerWidth
    h = window.innerHeight
    aspect = w/h
    renderer.setSize(w,h)
    persCam.aspect = aspect

    persCam.updateProjectionMatrix()
}

let create3dText = () => {
    let fontLoader = new THREEE.FontLoader()
    let material 
    let text
    let textGeo
    fontLoader.load('./three.js-master/examples/fonts/optimer_bold.typeface.json', (font) =>{
        textGeo = new THREEEE.TextGeometry("Welcome to ComiCase",{
            font: font,
            size: 4,
            height: 2.5
        })
        material = new THREE.MeshNormalMaterial()
        text = new THREE.Mesh(textGeo,material)
        text.position.set(-29,1,0)

        scene.add(text)
    })
}

let create3dText2 = () => {
    let fontLoader = new THREEE.FontLoader()
    let material 
    let text
    let textGeo
    fontLoader.load('./three.js-master/examples/fonts/optimer_bold.typeface.json', (font) =>{
        textGeo = new THREEEE.TextGeometry("Welcome to ComiCase",{
            font: font,
            size: 4,
            height: 2.5
        })
        material = new THREE.MeshNormalMaterial()
        text = new THREE.Mesh(textGeo,material)
        text.position.set(-30,-15,0)
        
        scene.add(text)
    })
}

let create3dText3 = () => {
    let fontLoader = new THREEE.FontLoader()
    let material 
    let text
    let textGeo
    fontLoader.load('./three.js-master/examples/fonts/optimer_bold.typeface.json', (font) =>{
        textGeo = new THREEEE.TextGeometry("Welcome to ComiCase",{
            font: font,
            size: 4,
            height: 2.5
        })
        material = new THREE.MeshNormalMaterial()
        text = new THREE.Mesh(textGeo,material)
        text.position.set(-32,-35,0)
        
        scene.add(text)
    })
}



window.onload = () =>{
    init();

    persCam.position.set(10,20,60)
    persCam.lookAt(0,-15)

    create3dText();
    create3dText2();
    create3dText3();

    
    animate();
}

let animate = () => {
    requestAnimationFrame(animate)
    renderer.render(scene,persCam)
}