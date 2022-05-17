// add script tag and src to the document
const script = document.createElement('script')
script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.apiKey}&callback`
document.body.appendChild(script)

console.log(process.env.apiKey)


{/* <script 
        {{!-- pass to src the process.eng.password --}}
        
            src="{`https://maps.googleapis.com/maps/api/js?key=${process.env.apiKey}&callback`}">
</script> */}