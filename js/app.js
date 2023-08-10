const loadData = async (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    showData(data.data.tools, dataLimit);
}

const showData = (elements, dataLimit) => {
    const showAll = document.getElementById('see-more');
    if (dataLimit && elements.length > 6) {
        elements = elements.slice(0, 6);
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
    elements.forEach(element => {
        const createCardDiv = document.createElement('div');
        createCardDiv.classList.add('col');
        createCardDiv.innerHTML = `
        
                <div class="card h-100 p-4">
                    <img src="${element.image ? element.image : 'No Image'}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h3 class="card-title fw-bold">${element.name}</h3>
                        <div class="mb-4">
                            <h6 class="text-body-tertiary">1. Natural language processing</h6>
                            <h6 class="text-body-tertiary">2. Contextual understanding</h6>
                            <h6 class="text-body-tertiary">3. Text generation</h6>
                        </div>
                        <div class="text-success w-90">
                            <hr>
                        </div>
                        <!-- main div start -->
                        <div class="d-flex align-items-center justify-content-between">
                            <div>
                                <h3 class="fs-4 fw-bold">Card title</h3>
                                <i class="fa-solid fa-calendar-days text-body-tertiary">16/01/2000</i>
                            </div>
                            <div class="">
                            <p>
                            <i onclick="displayModal(${element.id})" class="fa-solid fa-arrow-right bg-light rounded-circle p-3" data-bs-toggle="modal"
                                data-bs-target="#AIUniverseHub"></i>
                        </p>
                            </div>
                        </div>
                        <!-- main div end -->
                    </div>
                </div>
        `
        cardContainer.appendChild(createCardDiv);
    });
    document.getElementById('see-more').addEventListener('click', function () {
        loadData()
    })

}

const displayModal = async (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/0${id}`;
    const res = await fetch(url);
    const data = await res.json();
    moreDetail(data.data)
}
const moreDetail = (moreInfo) => {
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 g-4 ">
    <div class="col">
        <div class="card h-100 border border-black text-bg-light">
            <div class="card-body p-4">
                <h4>${moreInfo.description ? moreInfo.description : 'No description'}</h4>
            </div>
            
            <section>
                <div class="row row-cols-3 g-4 text-center p-4">
                    <div class="col">
                        <div class="card h-100">
                            <div class="card-body text-success fw-bold d-flex flex-column justify-content-center align-items-center">
                                <p>${moreInfo.pricing ? moreInfo.pricing[0].price : 'No Price'}</p>
                                <p>${moreInfo.pricing ? moreInfo.pricing[0].plan : 'No Plan'}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-100">
                            <div class="card-body text-success fw-bold d-flex flex-column justify-content-center align-items-center">
                            <p>${moreInfo.pricing ? moreInfo.pricing[1].price : 'No Price'}</p>
                            <p>${moreInfo.pricing ? moreInfo.pricing[1].plan : 'No Plan'}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-100">
                            <div class="card-body text-success fw-bold d-flex flex-column justify-content-center align-items-center">
                            <p>${moreInfo.pricing ? moreInfo.pricing[2].price : 'No Price'}</p>
                            <p>${moreInfo.pricing ? moreInfo.pricing[2].plan : 'No Plan'}</p>                 
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <div class="d-flex justify-content-between text-bg-light px-4 mb-2">
                <div>
                    <h4 class="fw-bold">Features</h4>
                    <ul>
                        <li>${moreInfo.features ? moreInfo.features[1].feature_name : 'No Feature'}</li>
                        <li>${moreInfo.features ? moreInfo.features[2].feature_name : 'No Feature'}</li>
                        <li>${moreInfo.features ? moreInfo.features[3].feature_name : 'No Feature'}</li>
                    </ul>
                </div>
                <div>
                    <h4 class="fw-bold">Integrations</h4>
                    <ul>
                        <li>${moreInfo.integrations ? moreInfo.integrations[0] : 'No Integrations'}</li>
                        <li>${moreInfo.integrations ? moreInfo.integrations[1] : 'No Integrations'}</li>
                        <li>${moreInfo.integrations ? moreInfo.integrations[2] : 'No Integrations'}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card h-100 p-4">
            <img src="${moreInfo.image_link ? moreInfo.image_link[0] || moreInfo.image_link[1] : 'No Image'}" class="card-img-top" alt="">
                <div class="ms-5">
                    <p class="position-absolute top-0 start-50 translate-middle rounded bg-light mt-4 px-3 py-1">${moreInfo.accuracy ? moreInfo.accuracy.score : '0'}% accuracy</P>
                </div>
            
            <div class="card-body text-center">
                <h4 class="fw-bold">${moreInfo.input_output_examples ? moreInfo.input_output_examples[0].input || moreInfo.input_output_examples[1].input : 'No Input Example'}</h4>
                <p>${moreInfo.input_output_examples ? moreInfo.input_output_examples[0].output || moreInfo.input_output_examples[1].output : 'No Output Example'}</p>
            </div>
        </div>
    </div>
    </div>
    `
}
loadData(6);