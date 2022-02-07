import * as THREE from './three.js-master/build/three.module.js'
import * as THREEE from './three.js-master/examples/jsm/loaders/FontLoader.js'
import * as THREEEE from './three.js-master/examples/jsm/geometries/TextGeometry.js'
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js'

var w,h,aspect;
var persCam,scene,renderer;
let boxMesh,rayCaster,mouse,boxMesh1;

let init = () =>{
    w = window.innerWidth
    h = window.innerHeight
    aspect = w/h

    persCam = new THREE.PerspectiveCamera(45,aspect,0.1,100)
    scene = new THREE.Scene()
    renderer = new THREE.WebGLRenderer({antialias:true})  
    
    renderer.setSize(w,h)
    renderer.setClearColor("brown")
    renderer.shadowMap.enabled = true

    rayCaster = new THREE.Raycaster()

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

let createAmbientLight = () => {
    let ambientLight = new THREE.AmbientLight()
    ambientLight.intensity = 0.8
    scene.add(ambientLight)
}

let createBox = () => {

    let textureLoader = new THREE.TextureLoader()
    let texture = textureLoader.load('./assets/xmen.jpg')
   
    let boxGeo = new THREE.BoxGeometry(20,30)
    let boxMat = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        map: texture
    })

    boxMesh1 = new THREE.Mesh(boxGeo,boxMat)
    boxMesh1.castShadow = true
    boxMesh1.receiveShadow = true

    boxMesh1.position.set(0,-17,0)
    boxMesh1.name = "image"
    // boxMesh.rotation.y += 4


    scene.add(boxMesh1)
}

let createBox2 = () => {

    let textureLoader = new THREE.TextureLoader()
    let texture = textureLoader.load('./assets/xmen1.jpg')
   
    let boxGeo = new THREE.BoxGeometry(20,30)
    let boxMat = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        map: texture
    })

    boxMesh = new THREE.Mesh(boxGeo,boxMat)
    boxMesh.castShadow = true
    boxMesh.receiveShadow = true

    boxMesh.position.set(23,-17,0)
    boxMesh.name = "image"
    // boxMesh.rotation.y += 4


    scene.add(boxMesh)
}

let createBox3 = () => {

    let textureLoader = new THREE.TextureLoader()
    let texture = textureLoader.load('./assets/xmen2.jpg')
   
    let boxGeo = new THREE.BoxGeometry(20,30)
    let boxMat = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        map: texture
    })

    boxMesh = new THREE.Mesh(boxGeo,boxMat)
    boxMesh.castShadow = true
    boxMesh.receiveShadow = true

    boxMesh.position.set(-23,-17,0)
    boxMesh.name = "image"
    // boxMesh.rotation.y += 4


    scene.add(boxMesh)
}

let create3dText = () => {
    let fontLoader = new THREEE.FontLoader()
    let material 
    let text
    let textGeo
    fontLoader.load('./three.js-master/examples/fonts/gentilis_bold.typeface.json', (font) =>{
        textGeo = new THREEEE.TextGeometry("X-MEN : First Issue",{
            font: font,
            size: 4,
            height: 2.5,            
        })
        material = new THREE.MeshNormalMaterial({
            color: 0xFF00FF
        })
        text = new THREE.Mesh(textGeo,material)
        text.castShadow = true
        text.receiveShadow = true
        text.position.set(-25,2,0)
        

        scene.add(text)
    })
}

let addStar = () =>{
    let sphereGeo = new THREE.TorusGeometry(1.5,0.023,15,17)
    let sphereMat = new THREE.MeshStandardMaterial({color: 0xFF0000})
    let sphere = new THREE.Mesh(sphereGeo, sphereMat)

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

    sphere.position.set(x,y,z)
    scene.add(sphere)
    Array(200).fill().forEach(addStar)

}

window.onload = () =>{
    
    init();

    persCam.position.set(0,0,55)
    persCam.lookAt(0,-15)
    
    createBox();
    createAmbientLight();
    create3dText();
    animate();
    
}

window.onmousemove = event => {
    mouse = new THREE.Vector2()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
}

window.onmousedown = event => {

    rayCaster.setFromCamera(mouse,persCam)

    let intersects = rayCaster.intersectObjects(scene.children)

    for(let i=0; i<intersects.length; i++){
        if(intersects[i].object.name == "image"){
            renderer.setClearColor("black")
            createBox2();
            createBox3();
        }
    }
}


let animate = () => {
    
    requestAnimationFrame(animate)
    boxMesh1.rotation.y += 0.01
    
    renderer.render(scene,persCam)

}