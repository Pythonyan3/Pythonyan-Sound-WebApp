<template>
    <div class="wrapper main">
        <!--GOTO PLAYER-->
        <section class="goto__section">
            <div class="container">
                <div class="goto__section__inner">
                    <h1 class="section__title">Looking for music?</h1>
                    <h2 class="section__text">Pick up your recently played right where you left off.</h2>
                    <a class="goto__section__button" href="">launch web player</a>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  name: 'Main',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper{
    flex: 1 0 auto;
}

.goto__section{
    align-items: center;
    padding: 60px 0 60px 0;
}

.goto__section__inner{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 90px 0 60px 0;
}

.section__title{
    color: black;
    font-size: 3rem;
    margin-bottom: 15px;
}

.section__text{
    color: black;
    margin-bottom: 20px;
}

.goto__section__button{
    color: black;
    padding: 16px 48px 18px;
    letter-spacing: 2px;
    font-weight: 500;
    color: #616467;
    border: 1px solid #616467;
    border-radius: 500px;
    text-transform: uppercase;
    transition: 0.3s;
}

.goto__section__button:hover{
    color: white;
    background-color: #616467;
}
</style>
