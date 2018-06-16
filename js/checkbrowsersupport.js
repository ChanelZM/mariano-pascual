function supportsSVG() {
  return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
}

console.log(supportsSVG());

if (supportsSVG() == false){
    document.getElementById('orientation-overlay').removeAttribute('hidden');
}
