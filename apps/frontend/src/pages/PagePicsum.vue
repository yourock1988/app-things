<script>
export default {}
</script>

<template>
  <VContainer>
    <VRow>
      <VCol v-for="n of 200" :key="n" cols="6" sm="4" md="3" lg="2" xl="1">
        <VCard>
          <VImg
            :src="`https://picsum.photos/300/200?image=${n * 4 + 7}`"
            :lazy-src="`https://picsum.photos/10/6?image=${
              n * 3 + 7
            }&grayscale`"
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular
                  color="grey-lighten-4"
                  indeterminate
                ></v-progress-circular>
              </div>
            </template>
          </VImg>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
