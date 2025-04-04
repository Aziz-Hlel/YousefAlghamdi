export const pickRandomPhoto = () => {
    return ["property_img1.png", "property_img2.png", "property_img3.png", "property_img4.png"][Math.floor(Math.random() * 4)]
}