<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
/**
 * Importació de axios per a poder implementar a les peticions
 */
const products = ref([])
const list = ref('llista')
const isEdit = ref(false)
const idEdicio = ref(null)

const form = ref({
  nom: '',
  quantitat: '',
  preu: '',
  descripcio: ''
})

const resetForm = () => {
  form.value = { nom: '', quantitat: '', preu: '', descripcio: '' }
  isEdit.value = false
  idEdicio.value = null
}

const add = () => {
  resetForm()
  list.value = 'formulari'
}

const goList = () => {
  resetForm()
  list.value = 'llista'
}

const editar = (producte) => {
  form.value = { 
    nom: producte.nom, 
    quantitat: producte.quantitat, 
    preu: producte.preu, 
    descripcio: producte.descripcio 
  }
  idEdicio.value = producte.id_product
  isEdit.value = true
  list.value = 'formulari'
}

const fetchProducts = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/products')
    products.value = res.data
  } catch (error) {
    console.error(error)
  }
}

const guardarProduct = async () => {
  try {
    const data = {
      ...form.value,
      quantitat: parseInt(form.value.quantitat),
      preu: parseInt(form.value.preu)
    }

    if (isEdit.value) {
      await axios.put(`${'http://localhost:3000/api/products'}/${idEdicio.value}`, data)
    } else {
      await axios.post('http://localhost:3000/api/products', data)
    }
    
    await fetchProducts()
    goList()
  } catch (error) {
    console.error(error)
    alert("Error al guardar")
  }
}

const eliminarProduct = async (id) => {
  if (!confirm("Segur que vols eliminar aquest producte?")) return
  try {
    await axios.delete(`${'http://localhost:3000/api/products'}/${id}`)
    products.value = products.value.filter(p => p.id_product !== id)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchProducts()
})
/**
 * Carreguem la llista de productes
 */
</script>

<template>
  <div>
    <header>
      <h1>Productes</h1>
      <button v-if="list === 'llista'" @click="add">
        + Nou Producte
      </button>
    </header>

    <!-- Ací al header tenim les accions de afegir un nou producte -->

    <main v-if="list === 'llista'">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Quantitat</th>
            <th>Preu</th>
            <th>Descripció</th>
            <th>Accions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prod in products" :key="prod.id_product">
            <td>{{ prod.id_product }}</td>
            <td>{{ prod.nom }}</td>
            <td>{{ prod.quantitat }}</td>
            <td>{{ prod.preu }} €</td>
            <td>{{ prod.descripcio }}</td>
            <td>
              <button @click="editar(prod)">Editar</button>
              <button @click="eliminarProduct(prod.id_product)" >Eliminar</button>
            </td>
          </tr>
          <tr v-if="products.length === 0">
            <td colspan="6">No hi ha productes.</td>
          </tr>
        </tbody>
      </table>
    </main>
    <!-- EL main conté la tabla on es mostraran els productes guardats a la bd -->
    <main v-else>
      <h2>{{ isEdit ? 'Editar Product' : 'Afegir Product' }}</h2>
      <form @submit.prevent="guardarProduct">
        <div >
          <label>Nom:</label>
          <input v-model="form.nom" required />
        </div>
        <div >
          <label>Quantitat:</label>
          <input v-model="form.quantitat" type="number" required />
        </div>
        <div>
          <label>Preu (€):</label>
          <input v-model="form.preu" type="number" required />
        </div>
        <div>
          <label>Descripció:</label>
          <textarea v-model="form.descripcio"></textarea>
        </div>
        <div>
          <button type="submit">Guardar</button>
          <button type="button" @click="goList">Cancelar</button>
        </div>
      </form>
    </main>
    <!-- FOrmulari per a editar o afegir productes-->
  </div>
</template>
