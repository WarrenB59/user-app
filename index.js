let userData = [];

// Attention, ma fonction est Asynchrone, tu vas donc attendre que mon fetch et mes then s’exécutent (await) avant de faire ton console.log
const fetchUser = async () => {
  await fetch("https://randomuser.me/api/?results=24")
    .then((res) => res.json())
    .then((data) => (userData = data.results));
  console.log(userData[0]);
};

const userDisplay = async () => {
  await fetchUser();

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return newDate;
  };

  const dayCalc = (date) => {
    let today = new Date();
    let todayTimestamp = Date.parse(today);
    let timestamp = Date.parse(date);

    /* formule / 8.64e7 trouvée sur StackOverflow. 
    Soustraction de 2 timestamp et en extraire le nombre de jours */
    return Math.ceil((todayTimestamp - timestamp) / 8.64e7);
  };

  document.body.innerHTML = userData
    .map(
      (user) => `
    <div class="card">
    <img src="${user.picture.large}" alt="photo de ${user.name.first}">
    <h3>${user.name.first} ${user.name.last}</h3>
    <h5>Né(e) le : ${dateParser(user.dob.date)}, ${user.dob.age} ans</h5>    
    <p>${user.location.city}, ${user.location.country}</p>
    <em>Membre depuis le : ${dayCalc(user.registered.date)} jours</em>
    </div>
  `
    )
    .join("");
};

userDisplay();
