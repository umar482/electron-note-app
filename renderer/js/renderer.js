let btn = document.getElementById("sbmt-btn")
let title_el = document.getElementById("note-title")
let desc_el = document.getElementById("note-description")

document.getElementById("sbmt-btn").addEventListener("click", async function(event){
  let title = title_el.value;
  let description = desc_el.value;

  const res = await api.createNote({
    title,
    description
  })

  console.log(res);
  
  title_el.value = "";
  desc_el.value = "";
});

document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
  const isDarkMode = await window.darkMode.toggle()
  document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async () => {
  await window.darkMode.system()
  document.getElementById('theme-source').innerHTML = 'System'
})
