// fetch('https://randomuser.me/api/?results=12')
// .then(res => res.json())
// .then(data => console.log(data))
const gallery = document.getElementById('gallery');
const body = document.querySelector('body');

// search Container
const searchContainer = document.querySelector('.search-container');
searchContainer.innerHTML = `<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;
const searchField = document.getElementById('search-input');
const profileCards = gallery.children;

function fetchData(url){
  return fetch(url)
  .then(checkStatus)
  .then(res => res.json())
  .catch(error => console.log('Error is', error))
}

function checkStatus(response){
  if(response.ok){
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

fetchData('https://randomuser.me/api/?results=12&nat=us')
.then(data => {
  generateGrid(data.results);
  generateModal(data.results);
  })

function generateGrid(data){
// function that parses the JSON object and lists all the employee information in a grid.
 const html= data.map(item => `<div class="card">
              <div class="card-img-container">
              <img class="card-img" src='${item.picture.thumbnail}' alt="profile picture">
              </div>
              <div class="card-info-container">
                 <h3 id="name" class="card-name cap">${item.name.title} ${item.name.first} ${item.name.last}</h3>
              <p class="card-text">${item.email}</p>
              <p class="card-text">${item.location.city},${item.location.state}</p>
              </div>
              </div>
              `).join('');

  console.log(html);
  gallery.innerHTML = html;

}

function generateModal(data){
  // function that generates a modal on click
  const cards = document.querySelectorAll('.card');
  for(let i=0; i<cards.length; i++){
    cards[i].addEventListener('click', ()=> {
      let profile = data[i];
      console.log(profile);
      createModal(profile, data);
      modalToggle(profile, data);
    });
  }
}

function createModal(profile, data){
  // function that creates a modal and displays on click with a close button
  const modalWindow = document.createElement('div');
  if (document.querySelector('.modal-container')) {
		document.querySelector('.modal-container').remove();
	}
  modalWindow.className = 'modal-container';
  modalWindow.innerHTML = `<div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src='${profile.picture.large}'alt="profile picture">
          <h3 id="name" class="modal-name cap">${profile.name.title} ${profile.name.first} ${profile.name.last}</h3>
          <p class="modal-text">${profile.email}</p>
          <p class="modal-text cap">${profile.location.city}</p>
          <hr>
          <p class="modal-text">${profile.cell}</p>
          <p class="modal-text">${capital(profile.location.street)},${capital(profile.location.city)},${capital(profile.location.state)} ${profile.location.postcode}</p>
          <p class="modal-text">${formatDOB(profile.dob.date)}</p>
      </div>
  </div>
  <div class="modal-btn-container">
      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" class="modal-next btn">Next</button>
  </div>
</div>
  `;
     body.appendChild(modalWindow);
     closeModal();
     modalToggle(profile, data);
}

function closeModal(){
  // function to close the modal window when the close btn is clicked
  const modalContainer = document.querySelector('.modal-container');
  const closebtn = document.querySelector('#modal-close-btn');
  modalContainer.addEventListener('click', event => {
    if(event.target === modalContainer || event.target === closebtn)
   {
    console.log(event.target);
    modalContainer.remove();
    }
  });
}

function capital(name){
    return name.charAt(0).toUpperCase()+name.slice(1);
}

function formatDOB(dob){
  let birthday = dob.split('-');
  let year = birthday[0].substring(0,4);
  let month = birthday[1];
  let day = birthday[2].substring(0,2);
  let dateOfBirth = `${month}/${day}/${year}`
  return dateOfBirth;
}
// Extra Credit

function search(event){
  // search function to search from the list of employees
  event.preventDefault();
  var name = searchField.value.toLowerCase();
  for(let i=0; i<profileCards.length; i++){
    let profileName = profileCards[i].innerText.toLowerCase();
    if(profileName.includes(name)){
      profileCards[i].style.display='flex';
    } else {
      profileCards[i].style.display="none";
    }
  }
}

function modalToggle(profile, data){
  // function to move prev,next on the list of employees
  const allCards = document.querySelectorAll('.card');
  const prev = document.querySelector('#modal-prev');
  const next = document.querySelector('#modal-next');
  const totalProfiles = allCards.length;
  console.log("Total profiles", totalProfiles);
  let index = data.indexOf(profile);
  next.addEventListener('click', () => {
    if((index + 1) < totalProfiles){
      createModal(data[index+1], data);
    } else {
      createModal(data[0], data);
      // end of the modal
    }
  });
  prev.addEventListener('click', ()=> {
    if(data[index-1]){
      createModal(data[index-1], data);
    } else {
      createModal(data[totalProfiles-1],data);
    }
  });
}
// Event Listeners
searchContainer.addEventListener('submit', event => search(event) );
searchContainer.addEventListener('keyup', event => search(event) );
