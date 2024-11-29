<?php

namespace App\Tests\Entity;

use App\Tests\Functional\AbstractApiTestCase;
use App\Tests\SetUpFixturesTrait;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\PropertyAccess\PropertyAccess;

abstract class AbstractTestEntity extends KernelTestCase
{
    use SetUpFixturesTrait;

    /**
     * @param array<mixed> $values
     */
    protected function _testGettersSetters(string $class, array $values, ?object $entity = null): object
    {
        if (null === $entity) {
            $entity = new $class();
        }
        $accessor = PropertyAccess::createPropertyAccessor();

        foreach ($values as $field => $value) {
            $setter = \sprintf('set%s', ucfirst($field));

            $this->assertTrue(
                $accessor->isWritable($entity, $field),
                \sprintf('Property "%s" of entity "%s" is not writable.', $field, $entity::class)
            );
            $this->assertEquals($entity, $entity->$setter($value));

            $this->assertTrue(
                $accessor->isReadable($entity, $field),
                \sprintf('Property "%s" of entity "%s" is not readable.', $field, $entity::class)
            );
            $this->assertEquals($value, $accessor->getValue($entity, $field));
        }

        return $entity;
    }

    /**
     * @param array<mixed> $subClassList
     */
    protected function testAddRemoveGetXXX(object $entity, array $subClassList): void
    {
        foreach ($subClassList as $shortClassNameAlias => $subClass) {
            $shortClassName = /* \is_int($shortClassNameAlias)
                ? AbstractApiTestCase::getClassShortName($subClass)
                :  */ $shortClassNameAlias;
            $addXXXMethod = \sprintf('add%s', $shortClassName);
            $removeXXXMethod = \sprintf('remove%s', $shortClassName);
            $getXXXMethod = \sprintf('get%ss', $shortClassName);

            $entity->{$addXXXMethod}($em1 = new $subClass())
                ->{$addXXXMethod}($em2 = new $subClass())
                ->{$addXXXMethod}($em3 = new $subClass())
                ->{$removeXXXMethod}($em2);
            $this->assertCount(2, $ems = $entity->{$getXXXMethod}());
            $this->assertContains($em1, $ems);
            $this->assertContains($em3, $ems);
        }
    }
}
