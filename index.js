
const fileInput = document.querySelector(".file-input"),
filterOption = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector(".slider input"),
rotateoption = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview-img img"),
resetFilterBtn = document.querySelector(".reset-filter"),
saveImg = document.querySelector(".save-img"),
chooseImgBtn = document.querySelector(".choice-img");





let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0; 
const applyFilters = () => {
    previewImg.style.transform = `rotate(${rotate}deg)`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}


const loadImage = () => {
    let file = fileInput.files[0]
   if(!file) return;
   previewImg.src = URL.createObjectURL(file)
   previewImg.addEventListener("load", ()=>{
    document.querySelector(".container").classList.remove("disable")
   });
}
filterOption.forEach(option=>{
    option.addEventListener("click", ()=>{
        document.querySelector(".filter .active").classList.remove("active")
        option.classList.add("active")
        filterName.innerText = option.innerText;

        
        if(option.id === "brightness"){
            filterSlider.max = "200"
            filterSlider.value = brightness
            filterValue.innerText = `${brightness}%`;
        }
        else if(option.id === "saturation"){
            filterSlider.max = "200"
            filterSlider.value = saturation
            filterValue.innerText = `${saturation}%`
        }
        else if(option.id === "inversion"){
            filterSlider.max = "100"
            filterSlider.value = inversion
            filterValue.innerText = `${inversion}%`
        }
        else {
            filterSlider.max = "100"
            filterSlider.value = grayscale
            filterValue.innerText = `${grayscale}%`
        }
    })
})


const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`
    const selectedFilter = document.querySelector(".filter .active")

    if(selectedFilter.id === "brightness"){

        brightness = filterSlider.value
    }
        else if (selectedFilter.id==="saturation"){
            saturation = filterSlider.value
        }
        else if(selectedFilter.id==="inversion"){
            inversion = filterSlider.value
        }
        else{
            grayscale= filterSlider.value
        }
        applyFilters();

    }

const resetFilter = () => {
    brightness = 100; saturation = 100; inversion = 0; grayscale = 0;
    applyFilters();
}

const saveImage = () => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = previewImg.naturalWidth
    canvas.height = previewImg.naturalHeight
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
    

    ctx.drawImage(previewImg, 0, 0, canvas.width,canvas.height)
    const link = document.createElement("a")
    link.download = "anikmollik122321.jpg"
    link.href = canvas.toDataURL()
    link.click()

}
rotateoption.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id === "left"){
              rotate -=90;
        }
        else if(option.id === "right"){
            rotate +=90;
        }
        else if(option.id === "horizontal"){
            rotate -=180;
        } else if(option.id=== "vertical"){
            rotate +=180;
        }
        applyFilters()
    });
});

fileInput.addEventListener("change",loadImage)
chooseImgBtn.addEventListener("click", () => fileInput.click())
filterSlider.addEventListener("input",updateFilter)
resetFilterBtn.addEventListener("click",resetFilter)
saveImg.addEventListener("click",saveImage)


 