<template>
    <div class="tabs is-toggle is-centered">
        <ul>
            <router-link to="/hour" active-class="is-active" tag="li"><a>Hour</a></router-link>
            <router-link to="/day" active-class="is-active" tag="li"><a>Day</a></router-link>
            <router-link to="/week" active-class="is-active" tag="li"><a>Week</a></router-link>
            <router-link to="/month" active-class="is-active" tag="li"><a>Month</a></router-link>
            <router-link to="/year" active-class="is-active" tag="li"><a>Year</a></router-link>
        </ul>
    </div>
</template>
