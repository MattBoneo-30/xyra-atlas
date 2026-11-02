"""Generate original, self-contained Atlas course illustrations.

Run: python scripts/artwork_builder.py; committed assets need no Python at runtime.
All geometry and colors are local SVG, no fonts, CDNs or embedded external images.
"""
from pathlib import Path
import random
import math

OUT = Path(__file__).resolve().parent.parent / 'assets'
OUT.mkdir(exist_ok=True)

SCENES = {
'psychology': ('#1b1236','#774f94','#ffa9c3'),
'laws': ('#16182f','#635782','#fad9a1'),
'business': ('#1e1735','#77487e','#ffc69e'),
'savings': ('#1d193b','#786193','#ffd48d'),
'time': ('#1b1536','#71447a','#ffce9b'),
'languages': ('#1e193d','#86517e','#ffb9b9'),
'communication': ('#211638','#78477c','#f4c3ce'),
'thinking': ('#191738','#60549a','#bdaeff'),
'digital': ('#141932','#484e89','#b4c2ff'),
'career': ('#201634','#7b5686','#fad8a8'),
'science': ('#101b38','#4f5b94','#a8cafe'),
'relationships': ('#291737','#9e5c85','#ffd1c7'),
'negotiation': ('#1c1735','#695184','#fbd6af'),
'shadow': ('#150e29','#56324e','#eaadc0'),
}

# Unique hand-crafted central illustrations in a unified storybook/art nouveau visual system.
MOTIFS = {
'psychology': '''<path d="M-98 125v-53c-57-36-75-126-39-186 40-68 162-75 217-12 34 39 37 91 15 129-9 18-28 35-36 53v69" fill="#251d49" stroke="#f7c1ce" stroke-width="4"/><path d="M-8-78c-26-23-67-10-62 25-23 5-29 36-9 47-13 30 22 48 43 33 16 25 45 7 40-17V-65c-1-22-12-23-12-13m20 0c32-22 61 4 47 32 26 11 23 37 6 45 15 27-21 49-37 35-20 10-20-8-20-22" fill="none" stroke="#ffd9ad" stroke-width="7" stroke-linecap="round"/><path d="M-43-37c20-7 39 3 43 23M43-37C26-42 13-32 11-13M-31 16c11-5 24-2 35 6" fill="none" stroke="#ffdfbc" stroke-width="4"/><circle cy="-7" r="11" fill="#fff2d7"/>''',
'laws': '''<path d="M-155 118h310M-128 99h256M-140-89l140-86 140 86v16h-280z" fill="#dcc2ad" opacity=".9"/><rect x="-145" y="-76" width="290" height="23" rx="4" fill="#f5d4af"/><g fill="#d3abc3" stroke="#fff2db" stroke-width="3"><rect x="-123" y="-48" width="43" height="132" rx="4"/><rect x="-22" y="-48" width="43" height="132" rx="4"/><rect x="80" y="-48" width="43" height="132" rx="4"/></g><rect x="-150" y="87" width="300" height="22" rx="5" fill="#f8d4ae"/><path d="M0-183v42m-97 8h194" stroke="#ffedc7" stroke-width="6"/><circle cy="-185" r="10" fill="#ffe5b7"/><path d="M-83-132l-49 64q49 44 98 0zM83-132L34-68q49 44 98 0z" fill="#f7c49f" opacity=".9"/><path d="M-130-68h96M34-68h96" stroke="#fff2da" stroke-width="4"/>''',
'business': '''<g fill="#39284e" stroke="#dca8c6" stroke-width="2"><path d="M-165 122V-15h45V122"/><path d="M-105 122V-90h61V122"/><path d="M-30 122V-47h61V122"/><path d="M48 122v-157h53v157"/><path d="M116 122V-132h48v254"/></g><g fill="#ffe2c0">'''+''.join(f'<rect x="{x}" y="{y}" width="9" height="11" rx="2" opacity=".75"/>' for x in [-151,-87,-12,65,132] for y in [-8,23,55,87] if (x+y)%3!=0)+'''</g><path d="M-162 30-81-20-22 5 63-74 147-125" stroke="#ffd8a0" stroke-width="11" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M108-128h42v43" stroke="#fff0be" stroke-width="11" fill="none" stroke-linecap="round"/>''',
'savings': '''<path d="M-100-155h200l-12 43c56 36 66 91 54 155-13 76-51 110-142 110s-129-34-142-110c-12-64-2-119 54-155z" fill="#d9b9d2" fill-opacity=".15" stroke="#f6d7cc" stroke-width="7"/><path d="M-95-122h190M-119 44c76 35 162 35 238 0" fill="none" stroke="#ffe0b7" stroke-width="6" opacity=".6"/><g fill="#f4cb86" stroke="#fff3bf" stroke-width="3"><ellipse cx="-54" cy="70" rx="37" ry="13"/><path d="M-91 70v22c0 17 74 17 74 0V70"/><ellipse cx="30" cy="89" rx="38" ry="14"/><path d="M-8 90v22c0 16 76 16 76 0V90"/><ellipse cx="-8" cy="31" rx="40" ry="13"/><path d="M-48 31v24c0 17 80 17 80 0V31"/></g><path d="M-1-87v87M-34-62c11-27 72-19 70 7-2 22-65 15-69 37-4 25 70 34 73 5" stroke="#fce4a7" stroke-width="9" fill="none" stroke-linecap="round"/>''',
'time': '''<path d="M-107-158h214M-107 144h214" stroke="#ffe9c6" stroke-width="21" stroke-linecap="round"/><path d="M-91-146h182c0 59-27 78-70 119-24 24-24 43 0 69 48 42 70 58 70 95H-91c0-43 31-70 72-105 20-17 20-38 0-56-45-42-72-71-72-122z" fill="#dcc2dc" fill-opacity=".23" stroke="#ffdfc3" stroke-width="6"/><path d="M-70-127c8 55 63 79 70 94 10-23 62-35 70-94z" fill="#ffca9e" opacity=".85"/><path d="M-72 123Q0 21 72 123z" fill="#f7c797"/><path d="M0-32v97" stroke="#ffebb3" stroke-width="6" stroke-dasharray="3 12" stroke-linecap="round"/><g fill="#ffeebd"><circle cx="-20" cy="92" r="4"/><circle cx="23" cy="104" r="5"/><circle cx="0" cy="73" r="5"/></g>''',
'languages': '''<path d="M-185 132 0 90l185 42" fill="#46365e"/><path d="M-138 130V-85h34v215M105 130V-85h34v215" fill="#592c4f" stroke="#f5c39e" stroke-width="4"/><path d="M-171-104h341v30h-341z" fill="#ffcfac"/><path d="M-152-124h303v22h-303z" fill="#f4bfb4"/><path d="M-126 129Q0-28 128 129" stroke="#f9dbbf" stroke-width="3" fill="none" opacity=".6"/><g fill="#ffd4d2"><path d="M-210-21q52-29 76-75-5 57-39 90z"/><path d="M157 35q56-22 82-64-13 57-46 86z"/><path d="M7-164q35-22 55-50-8 45-40 60z"/></g><path d="M-60 124Q0 45 60 124" fill="#ffe4b5" opacity=".3"/>''',
'communication': '''<path d="M-166-116h232q22 0 22 22V30q0 25-25 25H-34L-93 101V55h-73q-21 0-21-25V-94q0-22 21-22z" fill="#b384b4" fill-opacity=".65" stroke="#ffd5d0" stroke-width="5"/><path d="M-78 0h230q22 0 22 22v82q0 24-24 24H92l-59 40v-40H-78q-22 0-22-24V22q0-22 22-22z" fill="#3e315f" stroke="#ffe4b8" stroke-width="5"/><g stroke="#ffe7df" stroke-linecap="round" stroke-width="9"><path d="M-139-68h169M-139-36h115"/><path d="M-51 49h172M-51 82h133"/></g>''',
'thinking': '''<path d="M-20-151 127-36 50 118-124 61z" fill="#9486d2" fill-opacity=".39" stroke="#ded9ff" stroke-width="6"/><path d="M-20-151 50 118M-20-151-124 61M127-36-124 61M127-36 50 118" stroke="#e6c7fb" stroke-width="4" opacity=".8"/><path d="M-178-60 127-36 194-135" fill="none" stroke="#f5ccff" stroke-width="10" stroke-linecap="round"/><path d="M-178-25 127-36 182-3M-178 3 127-36 190 76M-178 29 127-36 176 136" fill="none" stroke="#b1c7ff" stroke-width="5" opacity=".7"/><g fill="#ffdebd"><circle cx="-20" cy="-151" r="12"/><circle cx="127" cy="-36" r="12"/><circle cx="50" cy="118" r="10"/></g>''',
'digital': '''<path d="M0-172q62 49 138 64v84q0 120-138 176Q-138 96-138-24v-84q76-15 138-64z" fill="#8e99d2" fill-opacity=".23" stroke="#d6deff" stroke-width="7"/><rect x="-75" y="-6" width="150" height="111" rx="16" fill="#332b66" stroke="#f5dfdc" stroke-width="6"/><path d="M-50-8v-47q0-53 50-53t50 53v47" fill="none" stroke="#ffdfb0" stroke-width="13"/><circle cy="39" r="15" fill="#ffdcbb"/><path d="M0 46v28" stroke="#ffdcbb" stroke-width="12" stroke-linecap="round"/><g stroke="#98b8ff" stroke-width="5" stroke-linecap="round"><path d="M-177-76h63M114-76h72M-184 19h39M147 30h40M-155 112h65M89 125h77"/></g>''',
'career': '''<path d="M-175 130h350" stroke="#fce3c4" stroke-width="8"/><g fill="#765579" stroke="#ffdbc3" stroke-width="4"><rect x="-147" y="41" width="79" height="89" rx="8"/><rect x="-60" y="-22" width="83" height="152" rx="8"/><rect x="32" y="-90" width="80" height="220" rx="8"/></g><path d="M-149 85-63 35 28-29 113-101" stroke="#ffe3aa" stroke-width="11" stroke-linecap="round" fill="none"/><path d="M76-105h40v40" stroke="#fff0c5" stroke-width="10" fill="none"/><rect x="102" y="-164" width="85" height="55" rx="8" fill="#f4cbaa" opacity=".85"/><path d="M124-165v-13h42v13M105-140h77" fill="none" stroke="#513c60" stroke-width="5"/>''',
'science': '''<ellipse cx="0" cy="-13" rx="194" ry="64" transform="rotate(-26 0 -13)" fill="none" stroke="#c4ddff" stroke-width="11"/><circle cy="-13" r="109" fill="#665ba3" stroke="#d8d9ff" stroke-width="7"/><path d="M-94-70q75-61 154-24T85 32Q15 115-72 44" fill="#b3a7d9" opacity=".65"/><circle cx="0" cy="-13" r="58" fill="#8ea9e0" opacity=".43"/><circle cx="163" cy="-111" r="24" fill="#ffe0b5"/><path d="M-107 113h204M-20 113v-63" stroke="#d6d9ff" stroke-width="7"/><path d="M-74 121l-52 51M54 121l49 51" stroke="#ffdbba" stroke-width="8"/><g fill="#f6e8ff"><circle cx="-172" cy="-142" r="7"/><circle cx="186" cy="96" r="5"/></g>''',
'relationships': '''<path d="M-147 120c-5-99 40-161 98-161 34 0 49 17 49 46s-13 50-51 50M147 120c5-99-40-161-98-161C15-41 0-24 0 5s13 50 51 50" fill="none" stroke="#ffddcc" stroke-width="16" stroke-linecap="round"/><path d="M0-89c-59-75-166-3 0 126 166-129 59-201 0-126z" fill="#e6a6bc" fill-opacity=".75" stroke="#ffe4cf" stroke-width="6"/><path d="M-155 128Q-73 72 0 119q73-47 155 9" stroke="#f9cfa9" stroke-width="7" fill="none"/><g fill="#ffe5da"><circle cx="-167" cy="-100" r="6"/><circle cx="162" cy="-120" r="5"/></g>''',
'negotiation': '''<path d="M-142 126h284" stroke="#ead1e0" stroke-width="8"/><g fill="#7d5c92" stroke="#ffddb6" stroke-width="5"><path d="M-128 114-102 35l-23-30 33-43 40 36-22 39 19 77z"/><path d="M43 114 69 35 46 5l33-43 40 36-22 39 19 77z"/></g><g fill="#ffe2bd"><circle cx="-89" cy="-64" r="18"/><circle cx="82" cy="-64" r="18"/></g><path d="M-65-134q63-38 129 0" fill="none" stroke="#ffd9c6" stroke-width="9" stroke-linecap="round"/><path d="M30-155 65-134l-30 26" fill="none" stroke="#ffd9c6" stroke-width="9" stroke-linecap="round"/><path d="M65 166Q0 190-65 166" fill="none" stroke="#ffdfad" stroke-width="8"/>''',
'shadow': '''<path d="M-115-153q115-54 230 0v95c0 96-45 165-115 199-70-34-115-103-115-199z" fill="#3b2248" stroke="#d3a4c0" stroke-width="6"/><path d="M-72-45q35-27 72 4 37-31 72-4-8 56-72 61-64-5-72-61z" fill="#cf9db8" opacity=".84"/><path d="M-59-38q24-12 46 5-27 14-46-5m118 0q-24-12-46 5 27 14 46-5z" fill="#24162e"/><path d="M-1 10v57" stroke="#f5bdcf" stroke-width="6"/><path d="M-170-131 0-184l170 53" fill="none" stroke="#e2c1d3" stroke-width="4" stroke-dasharray="11 12"/><circle cy="-177" r="12" fill="#f4ccd4"/><path d="M-62 89Q0 119 62 89" fill="none" stroke="#dba6b4" stroke-width="6"/>'''
}


def scene(key):
    dark, mid, warm = SCENES[key]
    rng = random.Random(key)
    # Above art and ground forms a unified illustration language without heavy raster images.
    stars = []
    for i in range(51):
        x=rng.randint(24,876); y=rng.randint(18,395); r=rng.choice([.8,1.1,1.5,2.2]); o=rng.choice([.22,.35,.5,.7]);
        stars.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#ffe6cb" opacity="{o}"/>')
    for x,y,size in [(119,91,9),(750,87,11),(226,290,5)]:
        stars.append(f'<path d="M{x} {y-size}v{size*2}m-{size} -{size}h{size*2}" stroke="#fff1d5" stroke-width="1.5" opacity=".65"/>')
    starfield=''.join(stars)
    svg=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 480" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustrated {key} learning world">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1"><stop stop-color="{dark}"/><stop offset=".56" stop-color="{mid}"/><stop offset="1" stop-color="{dark}"/></linearGradient>
    <radialGradient id="glow"><stop stop-color="{warm}" stop-opacity=".69"/><stop offset=".28" stop-color="{warm}" stop-opacity=".23"/><stop offset="1" stop-color="{warm}" stop-opacity="0"/></radialGradient>
    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1"><stop stop-color="{mid}" stop-opacity=".92"/><stop offset="1" stop-color="{dark}"/></linearGradient>
    <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1"><stop stop-color="{warm}" stop-opacity=".14"/><stop offset="1" stop-color="{dark}" stop-opacity=".15"/></linearGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="20"/></filter>
  </defs>
  <rect width="900" height="480" fill="url(#sky)"/>
  <circle cx="601" cy="217" r="268" fill="url(#glow)"/>
  <circle cx="597" cy="216" r="172" fill="none" stroke="{warm}" stroke-opacity=".32" stroke-width="2"/>
  <circle cx="597" cy="216" r="153" fill="url(#panel)" stroke="{warm}" stroke-opacity=".20" stroke-width="2"/>
  <g>{starfield}</g>
  <path d="M0 336Q118 298 207 344T414 329Q505 310 571 347T772 313L900 344v136H0z" fill="{mid}" opacity=".28"/>
  <path d="M0 385Q126 346 232 380T453 374Q568 333 706 371T900 360v120H0z" fill="url(#ground)" opacity=".75"/>
  <path d="M0 433Q150 403 295 429T633 421Q791 402 900 426v54H0z" fill="{dark}" opacity=".68"/>
  <ellipse cx="599" cy="399" rx="210" ry="17" fill="{warm}" opacity=".19" filter="url(#soft)"/>
  <g transform="translate(600 246) scale(.89)">{MOTIFS[key]}</g>
  <path d="M54 42h145M54 42v122M846 438H714M846 438v-74" fill="none" stroke="{warm}" opacity=".26" stroke-width="2"/>
  <path d="M48 420C209 404 332 418 468 415" fill="none" stroke="{warm}" opacity=".17" stroke-width="2"/>
</svg>'''
    return svg

if __name__ == '__main__':
    for key in SCENES:
        name='course-'+key+'.svg'
        (OUT/name).write_text(scene(key),encoding='utf-8')
    print('Generated',len(SCENES),'individual course illustrations')
