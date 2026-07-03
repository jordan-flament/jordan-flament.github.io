## Optimisation d'un automate Siemens

Pour ce projet, j'ai développé un script de surveillance des cycles. Voici un extrait de la logique :

```python
def analyser_cycle(temps_cycle):
    if temps_cycle > 15.0:
        alerte_maintenance()
    return "Cycle OK"