<template>
  <div class="genre">
    <h1 class="genre-name">
      {{ genreName }}
    </h1>
    <ul class="movie-list">
      <li
        v-for="movie in movies"
        :key="movie.title"
        class="movie-list-item"
      >
        <MovieCard :movie="movie" />
      </li>
    </ul>
  </div>
</template>
<script setup>
import MovieCard from '@/components/card/MovieCard.vue';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import httpClient from '@/httpClient';

const route = useRoute();
const genreName = ref();
const getGenreName = async () => {
  try {
    const response = await httpClient.get(`/api/public/genres/${route.params.id}`);
    genreName.value = response.data.name;
  } catch (e) {
    // console.log(e);
  }
};

const movies = ref([]);
const getMovies = async () => {
  try {
    const response = await httpClient.get(`/api/public/movies/genre/${route.params.id}`);
    movies.value = response.data;
  } catch (e) {
    // console.log(e);
  }
};
onMounted(() => {
  getGenreName();
  getMovies();
});

watch(() => route.params.id, () => {
  getGenreName();
  getMovies();
});
</script>

<style>
.genre {
  margin: 0 70px;
}

.movie-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(247px, 1fr));
  row-gap: 20px;
  margin-top: 40px;
  padding: 0 20px;
}

.movie-list-item {
  margin-right: 30px;
}

.genre-name {
  margin-top: 40px;
  margin-left: 30px;
  margin-bottom: 0;
}
</style>
